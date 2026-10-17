package com.robotics.education.school;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrincipalSchoolRepository extends JpaRepository<PrincipalSchool, Long> {
    List<PrincipalSchool> findAllByUserId(Long userId);
    boolean existsByUserIdAndSchoolId(Long userId, Long schoolId);
    void deleteAllByUserId(Long userId);
}
