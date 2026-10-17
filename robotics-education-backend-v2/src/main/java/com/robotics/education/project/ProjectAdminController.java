package com.robotics.education.project;

import com.robotics.education.common.*;
import com.robotics.education.program.Program;
import com.robotics.education.program.ProgramProjectLinkService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/projects")
@PreAuthorize("hasAnyRole('ADMIN','EDITOR')")
public class ProjectAdminController {
    public record Request(
        @NotBlank String title, @NotBlank String slug, @NotBlank String description,
        String difficulty, String gradeRange, String skills, String imageUrl, String listImageUrl, String videoUrl,
        Integer displayOrder, Boolean published, Set<Long> programIds) {}

    public record Response(
        Long id, String title, String slug, String description, String difficulty, String gradeRange,
        String skills, String imageUrl, String listImageUrl, String videoUrl, Integer displayOrder, boolean published, List<Long> programIds) {}

    private final ProjectRepository repo;
    private final ProgramProjectLinkService projectLinks;

    public ProjectAdminController(ProjectRepository repo, ProgramProjectLinkService projectLinks) {
        this.repo = repo;
        this.projectLinks = projectLinks;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public ApiResponse<List<Response>> list() {
        return ApiResponse.ok(repo.findAll().stream().map(this::map).toList());
    }

    @PostMapping
    @Transactional
    public ApiResponse<Response> create(@Valid @RequestBody Request r) {
        if (repo.existsBySlug(r.slug())) throw new IllegalArgumentException("Slug already exists");
        Project p = new Project();
        apply(p, r);
        p = repo.save(p);
        projectLinks.setPrograms(p, r.programIds());
        return ApiResponse.created(map(p));
    }

    @PutMapping("/{id}")
    @Transactional
    public ApiResponse<Response> update(@PathVariable Long id, @Valid @RequestBody Request r) {
        Project p = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        if (!p.getSlug().equals(r.slug()) && repo.existsBySlug(r.slug())) throw new IllegalArgumentException("Slug already exists");
        apply(p, r);
        if (r.programIds() != null) {
            projectLinks.setPrograms(p, r.programIds());
        }
        return ApiResponse.ok(map(p));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ApiResponse<Void> delete(@PathVariable Long id) {
        Project p = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        p.getPrograms().forEach(program -> program.getProjects().remove(p));
        repo.delete(p);
        return ApiResponse.message("Project deleted");
    }

    private void apply(Project p, Request r) {
        p.setTitle(r.title());
        p.setSlug(r.slug());
        p.setDescription(r.description());
        p.setDifficulty(r.difficulty());
        p.setGradeRange(r.gradeRange());
        p.setSkills(r.skills());
        p.setImageUrl(r.imageUrl());
        p.setListImageUrl(r.listImageUrl());
        p.setVideoUrl(r.videoUrl());
        p.setDisplayOrder(r.displayOrder() == null ? 0 : r.displayOrder());
        p.setPublished(r.published() == null || r.published());
    }

    private Response map(Project p) {
        return new Response(
            p.getId(),
            p.getTitle(),
            p.getSlug(),
            p.getDescription(),
            p.getDifficulty(),
            p.getGradeRange(),
            p.getSkills(),
            p.getImageUrl(),
            p.getListImageUrl(),
            p.getVideoUrl(),
            p.getDisplayOrder(),
            p.isPublished(),
            p.getPrograms().stream().map(Program::getId).toList()
        );
    }
}
