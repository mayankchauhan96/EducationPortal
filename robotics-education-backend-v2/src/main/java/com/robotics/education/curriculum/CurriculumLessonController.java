package com.robotics.education.curriculum;

import com.robotics.education.common.ApiResponse;
import com.robotics.education.common.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/curriculum/{curriculumId}/lessons")
public class CurriculumLessonController {
    public record Response(Long id, String title, String description, Integer displayOrder) {}

    private final CurriculumRepository curricula;
    private final CurriculumLessonRepository lessons;

    public CurriculumLessonController(CurriculumRepository curricula, CurriculumLessonRepository lessons) {
        this.curricula = curricula;
        this.lessons = lessons;
    }

    @GetMapping
    public ApiResponse<List<Response>> list(@PathVariable Long curriculumId) {
        if (!curricula.existsById(curriculumId)) {
            throw new ResourceNotFoundException("Curriculum stage not found");
        }
        return ApiResponse.ok(lessons.findAllByCurriculumIdAndPublishedTrueOrderByDisplayOrderAscIdAsc(curriculumId)
            .stream()
            .map(lesson -> new Response(lesson.getId(), lesson.getTitle(), lesson.getDescription(), lesson.getDisplayOrder()))
            .toList());
    }
}
