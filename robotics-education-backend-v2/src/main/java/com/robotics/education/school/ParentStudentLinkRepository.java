package com.robotics.education.school;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParentStudentLinkRepository extends JpaRepository<ParentStudentLink, Long> {
    List<ParentStudentLink> findAllByParentId(Long parentId);
    boolean existsByParentIdAndStudentId(Long parentId, Long studentId);
    void deleteAllByParentId(Long parentId);
}
