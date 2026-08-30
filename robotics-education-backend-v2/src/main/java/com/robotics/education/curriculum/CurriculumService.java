package com.robotics.education.curriculum;

import com.robotics.education.common.ResourceNotFoundException;
import com.robotics.education.program.Program;
import com.robotics.education.program.ProgramRepository;
import com.robotics.education.program.ProgramResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class CurriculumService {
    private final CurriculumRepository repository;
    private final ProgramRepository programRepository;
    private static final Map<String, List<String>> FALLBACK_PROGRAMS_BY_LEVEL = Map.of(
        "Foundation Explorers", List.of("Coding"),
        "Young Makers", List.of("Coding", "Robotics"),
        "Future Engineers", List.of("Coding", "Robotics", "Electronics"),
        "Innovation Lab", List.of("Electronics", "AI & IoT"),
        "Advanced Innovators", List.of("Electronics", "AI & IoT")
    );

    public CurriculumService(CurriculumRepository repository, ProgramRepository programRepository) {
        this.repository = repository;
        this.programRepository = programRepository;
    }

    public List<CurriculumResponse> getPublished() {
        return repository.findAllByPublishedTrueOrderByDisplayOrderAsc().stream()
            .map(this::map)
            .toList();
    }

    public CurriculumResponse getBySlug(String slug) {
        return repository.findBySlugAndPublishedTrue(slug)
            .map(this::map)
            .orElseThrow(() -> new ResourceNotFoundException("Curriculum not found: " + slug));
    }

    private CurriculumResponse map(Curriculum curriculum) {
        List<ProgramResponse> programs = resolvePrograms(curriculum);

        return new CurriculumResponse(
            curriculum.getId(),
            curriculum.getSlug(),
            curriculum.getLevelName(),
            curriculum.getGradeRange(),
            curriculum.getLearningObjectives(),
            curriculum.getSkills(),
            curriculum.getImageUrl(),
            curriculum.isPublished(),
            curriculum.getDisplayOrder(),
            programs
        );
    }

    private List<ProgramResponse> resolvePrograms(Curriculum curriculum) {
        List<Program> linked = curriculum.getPrograms() == null ? List.of() : curriculum.getPrograms().stream()
            .sorted(Comparator.comparing(program -> program.getTitle().toLowerCase()))
            .toList();

        if (linked.isEmpty()) {
            List<String> fallbackTitles = FALLBACK_PROGRAMS_BY_LEVEL.getOrDefault(curriculum.getLevelName(), List.of());
            if (!fallbackTitles.isEmpty()) {
                linked = programRepository.findAllByPublishedTrueOrderByDisplayOrderAsc().stream()
                    .filter(program -> fallbackTitles.contains(program.getTitle()))
                    .sorted(Comparator.comparing(program -> program.getTitle().toLowerCase()))
                    .toList();
            }
        }

        return linked.stream()
            .map(program -> new ProgramResponse(
                program.getId(),
                program.getTitle(),
                program.getSlug(),
                program.getDescription(),
                program.getAgeGroup(),
                program.getTag(),
                program.getImageUrl(),
                program.isPublished(),
                program.getDisplayOrder(),
                List.of()
            ))
            .toList();
    }
}
