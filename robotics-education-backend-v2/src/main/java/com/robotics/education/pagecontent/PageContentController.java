package com.robotics.education.pagecontent;

import com.robotics.education.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PageContentController {
    private static final List<String> TESTIMONIAL_PAGE_KEYS = List.of(
        "testimonials",
        "testimonials-partner-schools",
        "testimonials-students",
        "testimonials-labs",
        "testimonials-community",
        "testimonials-workshops",
        "testimonials-awards",
        "testimonials-others"
    );

    private final PageContentRepository repository;

    public PageContentController(PageContentRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/pages/{pageKey}")
    public ApiResponse<List<PageContentResponse>> getPageContent(@PathVariable String pageKey) {
        List<PageContentResponse> sections = (pageKey.equalsIgnoreCase("testimonials")
            ? repository.findAllByPageKeyInAndPublishedTrueOrderByDisplayOrderAsc(TESTIMONIAL_PAGE_KEYS)
            : repository.findAllByPageKeyAndPublishedTrueOrderByDisplayOrderAsc(pageKey))
            .stream()
            .map(this::toResponse)
            .toList();

        return ApiResponse.ok(sections);
    }

    @GetMapping("/pages/testimonials/featured")
    public ApiResponse<List<PageContentResponse>> getFeaturedTestimonials() {
        List<PageContentResponse> stories = repository
            .findAllByPageKeyInAndPublishedTrueOrderByDisplayOrderAsc(TESTIMONIAL_PAGE_KEYS)
            .stream()
            .map(this::toResponse)
            .toList();

        return ApiResponse.ok(stories);
    }

    private PageContentResponse toResponse(PageContent item) {
        return new PageContentResponse(
            item.getId(),
            item.getPageKey(),
            item.getSectionTitle(),
            item.getSectionBody(),
            item.getBullets(),
            item.getDisplayOrder(),
            item.getCategory(),
            item.getImageUrl(),
            item.getImageAltText(),
            item.getAttribution());
    }
}
