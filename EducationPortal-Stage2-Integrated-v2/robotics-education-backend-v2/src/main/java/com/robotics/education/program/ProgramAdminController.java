package com.robotics.education.program;

import com.robotics.education.common.*;
import com.robotics.education.curriculum.CurriculumRepository;
import com.robotics.education.project.Project;
import com.robotics.education.project.ProjectRepository;
import com.robotics.education.project.ProjectResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/programs")
@PreAuthorize("hasAnyRole('ADMIN','EDITOR')")
public class ProgramAdminController {
    public record Request(
        @NotBlank String title, @NotBlank String slug, @NotBlank String description,
        String ageGroup, String tag, String imageUrl, Integer displayOrder, Boolean published,
        Set<Long> projectIds) {}

    private final ProgramRepository repo;
    private final ProjectRepository projects;
    private final CurriculumRepository curricula;

    public ProgramAdminController(ProgramRepository repo, ProjectRepository projects, CurriculumRepository curricula) {
        this.repo=repo; this.projects=projects; this.curricula=curricula;
    }

    @GetMapping
    @Transactional(readOnly=true)
    public ApiResponse<List<ProgramResponse>> list() {
        return ApiResponse.ok(repo.findAll().stream()
            .sorted(Comparator.comparing(Program::getDisplayOrder))
            .map(this::map).toList());
    }

    @PostMapping
    @Transactional
    public ApiResponse<ProgramResponse> create(@Valid @RequestBody Request r) {
        if (repo.existsBySlug(r.slug())) throw new IllegalArgumentException("Slug already exists");
        Program p = new Program();
        apply(p,r);
        p.setProjects(resolveProjects(r.projectIds()));
        return ApiResponse.created(map(repo.save(p)));
    }

    @PutMapping("/{id}")
    @Transactional
    public ApiResponse<ProgramResponse> update(@PathVariable Long id,@Valid @RequestBody Request r) {
        Program p=repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Program not found"));
        if(!p.getSlug().equals(r.slug()) && repo.existsBySlug(r.slug()))
            throw new IllegalArgumentException("Slug already exists");
        apply(p,r);
        p.setProjects(resolveProjects(r.projectIds()));
        return ApiResponse.ok(map(repo.save(p)));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ApiResponse<Void> delete(@PathVariable Long id) {
        Program p=repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Program not found"));
        p.getProjects().clear();
        curricula.findAll().forEach(c -> c.getPrograms().removeIf(existing -> existing.getId().equals(id)));
        repo.delete(p);
        return ApiResponse.message("Program deleted");
    }

    private void apply(Program p,Request r) {
        p.setTitle(r.title()); p.setSlug(r.slug()); p.setDescription(r.description());
        p.setAgeGroup(r.ageGroup()); p.setTag(r.tag()); p.setImageUrl(r.imageUrl());
        p.setDisplayOrder(r.displayOrder()==null?0:r.displayOrder());
        p.setPublished(r.published()==null || r.published());
    }

    private Set<Project> resolveProjects(Set<Long> ids) {
        if(ids==null || ids.isEmpty()) return new HashSet<>();
        return ids.stream()
            .map(id -> projects.findById(id).orElseThrow(()->new ResourceNotFoundException("Project not found: "+id)))
            .collect(Collectors.toSet());
    }

    private ProgramResponse map(Program p) {
        List<ProjectResponse> ps=p.getProjects().stream()
            .filter(Project::isPublished)
            .sorted(Comparator.comparing(Project::getTitle,String.CASE_INSENSITIVE_ORDER))
            .map(pr -> new ProjectResponse(pr.getId(),pr.getTitle(),pr.getSlug(),pr.getDescription(),
                    pr.getDifficulty(),pr.getGradeRange(),pr.getSkills(),pr.getImageUrl(),pr.getVideoUrl(),pr.isPublished()))
            .toList();
        return new ProgramResponse(p.getId(),p.getTitle(),p.getSlug(),p.getDescription(),p.getAgeGroup(),p.getTag(),
                p.getImageUrl(),p.isPublished(),p.getDisplayOrder(),ps);
    }
}
