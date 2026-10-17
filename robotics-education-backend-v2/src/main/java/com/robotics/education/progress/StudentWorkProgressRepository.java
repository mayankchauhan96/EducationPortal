package com.robotics.education.progress;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentWorkProgressRepository extends JpaRepository<StudentWorkProgress, Long> {
    List<StudentWorkProgress> findAllByStudentIdOrderByUpdatedAtDesc(Long studentId);
    java.util.Optional<StudentWorkProgress> findByIdAndStudentId(Long id, Long studentId);
}
