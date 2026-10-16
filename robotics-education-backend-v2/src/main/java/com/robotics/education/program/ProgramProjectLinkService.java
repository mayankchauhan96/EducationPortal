package com.robotics.education.program;

import com.robotics.education.common.ResourceNotFoundException;
import com.robotics.education.project.Project;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProgramProjectLinkService {
    private final ProgramRepository programs;

    public ProgramProjectLinkService(ProgramRepository programs) {
        this.programs = programs;
    }

    @Transactional
    public void setPrograms(Project project, Set<Long> programIds) {
        if (programIds != null && programIds.stream().anyMatch(Objects::isNull)) {
            throw new IllegalArgumentException("Program IDs must not contain null");
        }
        Set<Long> selectedIds = programIds == null ? Set.of() : programIds;
        List<Program> selectedPrograms = selectedIds.isEmpty() ? List.of() : programs.findAllById(selectedIds);
        if (selectedPrograms.size() != selectedIds.size()) {
            Set<Long> foundIds = selectedPrograms.stream().map(Program::getId)
                .collect(Collectors.toSet());
            Set<Long> missingIds = new HashSet<>(selectedIds);
            missingIds.removeAll(foundIds);
            throw new ResourceNotFoundException("Programs not found: " + missingIds);
        }

        project.getPrograms().forEach(program -> program.getProjects().remove(project));
        project.getPrograms().clear();
        selectedPrograms.forEach(program -> {
            program.getProjects().add(project);
            project.getPrograms().add(program);
        });
    }
}
