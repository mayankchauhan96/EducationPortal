package com.robotics.education.curriculum;

import com.robotics.education.common.*;
import com.robotics.education.program.Program;
import com.robotics.education.program.ProgramRepository;
import com.robotics.education.program.ProgramResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/curriculum")
@PreAuthorize("hasAnyRole('ADMIN','EDITOR')")
public class CurriculumAdminController {
    public record Request(
        @NotBlank String levelName, @NotBlank String slug, @NotBlank String gradeRange,
        String learningObjectives, String skills, String imageUrl, Integer displayOrder, Boolean published, Set<Long> programIds) {}

    private final CurriculumRepository repo;
    private final ProgramRepository programs;

    public CurriculumAdminController(CurriculumRepository repo, ProgramRepository programs) {
        this.repo = repo;
        this.programs = programs;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public ApiResponse<List<CurriculumResponse>> list() {
        return ApiResponse.ok(repo.findAll().stream().map(this::map).toList());
    }

    @PostMapping
    @Transactional
    public ApiResponse<CurriculumResponse> create(@Valid @RequestBody Request r) {
        if (repo.findBySlug(r.slug()).isPresent()) throw new IllegalArgumentException("Slug already exists");
        Curriculum c = new Curriculum();
        apply(c, r);
        c.setPrograms(resolvePrograms(r.programIds()));
        return ApiResponse.created(map(repo.save(c)));
    }

    @PutMapping("/{id}")
    @Transactional
    public ApiResponse<CurriculumResponse> update(@PathVariable Long id, @Valid @RequestBody Request r) {
        Curriculum c = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Curriculum not found"));
        if (!c.getSlug().equals(r.slug()) && repo.findBySlug(r.slug()).isPresent()) throw new IllegalArgumentException("Slug already exists");
        apply(c, r);
        c.setPrograms(resolvePrograms(r.programIds()));
        return ApiResponse.ok(map(repo.save(c)));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ApiResponse<Void> delete(@PathVariable Long id) {
        Curriculum c = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Curriculum not found"));
        c.getPrograms().clear();
        repo.delete(c);
        return ApiResponse.message("Curriculum deleted");
    }

    private void apply(Curriculum c, Request r) {
        c.setLevelName(r.levelName());
        c.setSlug(r.slug());
        c.setGradeRange(r.gradeRange());
        c.setLearningObjectives(r.learningObjectives());
        c.setSkills(r.skills());
        c.setImageUrl(r.imageUrl());
        c.setDisplayOrder(r.displayOrder() == null ? 0 : r.displayOrder());
        c.setPublished(r.published() == null || r.published());
    }

    private Set<Program> resolvePrograms(Set<Long> ids) {
        if (ids == null || ids.isEmpty()) return new HashSet<>();
        return ids.stream()
            .map(id -> programs.findById(id).orElseThrow(() -> new ResourceNotFoundException("Program not found: " + id)))
            .collect(Collectors.toSet());
    }

    private CurriculumResponse map(Curriculum c) {
        List<ProgramResponse> programResponses = c.getPrograms().stream()
            .sorted(Comparator.comparing(Program::getDisplayOrder))
            .map(p -> new ProgramResponse(
                p.getId(),
                p.getTitle(),
                p.getSlug(),
                p.getDescription(),
                p.getAgeGroup(),
                p.getTag(),
                p.getImageUrl(),
                p.isPublished(),
                p.getDisplayOrder(),
                List.of()
            ))
            .toList();

        return new CurriculumResponse(
            c.getId(),
            c.getSlug(),
            c.getLevelName(),
            c.getGradeRange(),
            c.getLearningObjectives(),
            c.getSkills(),
            c.getImageUrl(),
            c.isPublished(),
            c.getDisplayOrder(),
            programResponses
        );
    }
}
