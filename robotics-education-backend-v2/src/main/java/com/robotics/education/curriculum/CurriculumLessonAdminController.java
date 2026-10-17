package com.robotics.education.curriculum;

import com.robotics.education.common.ApiResponse;
import com.robotics.education.common.ResourceNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/curriculum/{curriculumId}/lessons")
@PreAuthorize("hasAnyRole('ADMIN','EDITOR')")
public class CurriculumLessonAdminController {
    public record Request(
        @NotBlank @Size(max = 160) String title,
        @Size(max = 1000) String description,
        Integer displayOrder,
        Boolean published
    ) {}

    public record Response(Long id, Long curriculumId, String title, String description, Integer displayOrder, boolean published) {}

    private final CurriculumRepository curricula;
    private final CurriculumLessonRepository lessons;

    public CurriculumLessonAdminController(CurriculumRepository curricula, CurriculumLessonRepository lessons) {
        this.curricula = curricula;
        this.lessons = lessons;
    }

    @GetMapping
    public ApiResponse<List<Response>> list(@PathVariable Long curriculumId) {
        requireCurriculum(curriculumId);
        return ApiResponse.ok(lessons.findAllByCurriculumIdOrderByDisplayOrderAscIdAsc(curriculumId)
            .stream().map(this::map).toList());
    }

    @PostMapping
    public ApiResponse<Response> create(@PathVariable Long curriculumId, @Valid @RequestBody Request request) {
        CurriculumLesson lesson = new CurriculumLesson();
        lesson.setCurriculum(requireCurriculum(curriculumId));
        apply(lesson, request);
        return ApiResponse.created(map(lessons.save(lesson)));
    }

    @PutMapping("/{lessonId}")
    public ApiResponse<Response> update(
        @PathVariable Long curriculumId,
        @PathVariable Long lessonId,
        @Valid @RequestBody Request request
    ) {
        CurriculumLesson lesson = lessons.findByIdAndCurriculumId(lessonId, curriculumId)
            .orElseThrow(() -> new ResourceNotFoundException("Curriculum lesson not found"));
        apply(lesson, request);
        return ApiResponse.ok(map(lessons.save(lesson)));
    }

    @DeleteMapping("/{lessonId}")
    public ApiResponse<Void> delete(@PathVariable Long curriculumId, @PathVariable Long lessonId) {
        CurriculumLesson lesson = lessons.findByIdAndCurriculumId(lessonId, curriculumId)
            .orElseThrow(() -> new ResourceNotFoundException("Curriculum lesson not found"));
        lessons.delete(lesson);
        return ApiResponse.message("Curriculum lesson deleted");
    }

    private Curriculum requireCurriculum(Long id) {
        return curricula.findById(id).orElseThrow(() -> new ResourceNotFoundException("Curriculum stage not found"));
    }

    private void apply(CurriculumLesson lesson, Request request) {
        lesson.setTitle(request.title().trim());
        lesson.setDescription(request.description());
        lesson.setDisplayOrder(request.displayOrder() == null ? 0 : request.displayOrder());
        lesson.setPublished(request.published() == null || request.published());
    }

    private Response map(CurriculumLesson lesson) {
        return new Response(
            lesson.getId(), lesson.getCurriculum().getId(), lesson.getTitle(), lesson.getDescription(),
            lesson.getDisplayOrder(), lesson.isPublished());
    }
}
