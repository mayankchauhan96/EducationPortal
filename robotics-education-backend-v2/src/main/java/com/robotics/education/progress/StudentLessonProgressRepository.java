package com.robotics.education.progress;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentLessonProgressRepository extends JpaRepository<StudentLessonProgress, Long> {
    List<StudentLessonProgress> findAllByStudentId(Long studentId);
    Optional<StudentLessonProgress> findByStudentIdAndLessonId(Long studentId, Long lessonId);
}
