package com.robotics.education.pagecontent;

import com.robotics.education.common.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PageContentController {
    private final PageContentRepository repository;

    public PageContentController(PageContentRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/pages/{pageKey}")
    public ApiResponse<List<PageContentResponse>> getPageContent(@PathVariable String pageKey) {
        List<PageContentResponse> sections = repository.findAllByPageKeyAndPublishedTrueOrderByDisplayOrderAsc(pageKey)
            .stream()
            .map(item -> new PageContentResponse(
                item.getId(),
                item.getPageKey(),
                item.getSectionTitle(),
                item.getSectionBody(),
                item.getBullets(),
                item.getDisplayOrder()))
            .toList();

        return ApiResponse.ok(sections);
    }
}
