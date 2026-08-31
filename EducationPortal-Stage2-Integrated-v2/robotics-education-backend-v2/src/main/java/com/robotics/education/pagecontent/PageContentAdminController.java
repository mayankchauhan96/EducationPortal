package com.robotics.education.pagecontent;

import com.robotics.education.common.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/page-content")
@PreAuthorize("hasAnyRole('ADMIN','EDITOR')")
public class PageContentAdminController {
    public record Request(
        @NotBlank String pageKey,@NotBlank String sectionTitle,@NotBlank String sectionBody,
        String bullets,Integer displayOrder,Boolean published) {}

    private final PageContentRepository repo;
    public PageContentAdminController(PageContentRepository repo){this.repo=repo;}

    @GetMapping
    public ApiResponse<List<PageContentResponse>> list() {
        return ApiResponse.ok(repo.findAll().stream().map(this::map).toList());
    }

    @PostMapping
    public ApiResponse<PageContentResponse> create(@Valid @RequestBody Request r) {
        PageContent p=new PageContent();apply(p,r);
        return ApiResponse.created(map(repo.save(p)));
    }

    @PutMapping("/{id}")
    public ApiResponse<PageContentResponse> update(@PathVariable Long id,@Valid @RequestBody Request r) {
        PageContent p=repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Page content not found"));
        apply(p,r);return ApiResponse.ok(map(repo.save(p)));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        if(!repo.existsById(id)) throw new ResourceNotFoundException("Page content not found");
        repo.deleteById(id);return ApiResponse.message("Page content deleted");
    }

    private void apply(PageContent p,Request r){
        p.setPageKey(r.pageKey());p.setSectionTitle(r.sectionTitle());p.setSectionBody(r.sectionBody());p.setBullets(r.bullets());
        p.setDisplayOrder(r.displayOrder()==null?0:r.displayOrder());p.setPublished(r.published()==null||r.published());
    }
    private PageContentResponse map(PageContent p){
        return new PageContentResponse(p.getId(),p.getPageKey(),p.getSectionTitle(),p.getSectionBody(),p.getBullets(),p.getDisplayOrder());
    }
}
