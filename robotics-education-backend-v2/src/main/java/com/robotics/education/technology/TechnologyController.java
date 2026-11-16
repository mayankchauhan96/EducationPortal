package com.robotics.education.technology;

import com.robotics.education.common.ApiResponse;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/technologies")
public class TechnologyController {
    private final TechnologyRepository repository;

    public TechnologyController(TechnologyRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public ApiResponse<List<TechnologyResponse>> list() {
        return ApiResponse.ok(repository.findAllByPublishedTrueOrderByDisplayOrderAscIdAsc()
            .stream()
            .map(this::map)
            .toList());
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
