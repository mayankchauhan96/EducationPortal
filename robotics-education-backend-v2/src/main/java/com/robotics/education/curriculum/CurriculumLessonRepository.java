package com.robotics.education.curriculum;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CurriculumLessonRepository extends JpaRepository<CurriculumLesson, Long> {
    List<CurriculumLesson> findAllByCurriculumIdOrderByDisplayOrderAscIdAsc(Long curriculumId);
    List<CurriculumLesson> findAllByCurriculumIdAndPublishedTrueOrderByDisplayOrderAscIdAsc(Long curriculumId);
    Optional<CurriculumLesson> findByIdAndCurriculumId(Long id, Long curriculumId);
}
