package com.robotics.education.school;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassroomMembershipRepository extends JpaRepository<ClassroomMembership, Long> {
    List<ClassroomMembership> findAllByUserId(Long userId);
    List<ClassroomMembership> findAllByClassroomId(Long classroomId);
    boolean existsByUserIdAndClassroomId(Long userId, Long classroomId);
    long countByUserId(Long userId);
    void deleteAllByUserId(Long userId);
}
