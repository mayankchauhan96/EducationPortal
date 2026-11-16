package com.robotics.education.technology;

import com.robotics.education.common.ApiResponse;
import com.robotics.education.common.ResourceNotFoundException;
import com.robotics.education.project.Project;
import com.robotics.education.project.ProjectRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/admin/technologies")
@PreAuthorize("hasAnyRole('ADMIN','EDITOR')")
public class TechnologyAdminController {
    public record Request(
        @NotBlank String slug,
        @NotBlank String title,
        String icon,
        @NotBlank String description,
        @NotBlank String overview,
        @NotBlank String topics,
        @NotBlank String resourceLabel,
        @NotBlank @Pattern(regexp = "^https?://\\S+$", message = "Resource URL must start with http:// or https://") String resourceUrl,
        Integer displayOrder,
        Boolean published
    ) {}

    private final TechnologyRepository technologies;
    private final ProjectRepository projects;

    public TechnologyAdminController(TechnologyRepository technologies, ProjectRepository projects) {
        this.technologies = technologies;
        this.projects = projects;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public ApiResponse<List<TechnologyResponse>> list() {
        return ApiResponse.ok(technologies.findAll().stream()
            .sorted(Comparator.comparing(Technology::getDisplayOrder).thenComparing(Technology::getId))
            .map(this::map)
            .toList());
    }

    @PostMapping
    @Transactional
    public ApiResponse<TechnologyResponse> create(@Valid @RequestBody Request request) {
        if (technologies.existsBySlug(request.slug())) {
            throw new IllegalArgumentException("Slug already exists");
        }
        Technology technology = new Technology();
        apply(technology, request);
        return ApiResponse.created(map(technologies.save(technology)));
    }

    @PutMapping("/{id}")
    @Transactional
    public ApiResponse<TechnologyResponse> update(@PathVariable Long id, @Valid @RequestBody Request request) {
        Technology technology = technologies.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Technology not found"));
        if (!technology.getSlug().equals(request.slug()) && technologies.existsBySlug(request.slug())) {
            throw new IllegalArgumentException("Slug already exists");
        }
        apply(technology, request);
        return ApiResponse.ok(map(technologies.save(technology)));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ApiResponse<Void> delete(@PathVariable Long id) {
        Technology technology = technologies.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Technology not found"));
        for (Project project : projects.findAll()) {
            project.getTechnologies().remove(technology);
            if (project.getPrimaryTechnology() != null && project.getPrimaryTechnology().getId().equals(id)) {
                project.setPrimaryTechnology(null);
            }
        }
        technologies.delete(technology);
        return ApiResponse.message("Technology deleted");
    }

    private void apply(Technology technology, Request request) {
        technology.setSlug(request.slug());
        technology.setTitle(request.title());
        technology.setIcon(request.icon());
        technology.setDescription(request.description());
        technology.setOverview(request.overview());
        technology.setTopics(request.topics());
        technology.setResourceLabel(request.resourceLabel());
        technology.setResourceUrl(request.resourceUrl());
        technology.setDisplayOrder(request.displayOrder() == null ? 0 : request.displayOrder());
        technology.setPublished(request.published() == null || request.published());
    }

    private TechnologyResponse map(Technology technology) {
        return new TechnologyResponse(
            technology.getId(),
            technology.getSlug(),
            technology.getTitle(),
            technology.getIcon(),
            technology.getDescription(),
            technology.getOverview(),
            technology.getTopics(),
            technology.getResourceLabel(),
            technology.getResourceUrl(),
            technology.getDisplayOrder(),
            technology.isPublished()
        );
    }
}
