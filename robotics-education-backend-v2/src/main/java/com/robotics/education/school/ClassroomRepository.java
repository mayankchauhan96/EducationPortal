package com.robotics.education.school;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    List<Classroom> findAllBySchoolIdOrderByNameAsc(Long schoolId);
    List<Classroom> findAllBySchoolIdIn(Set<Long> schoolIds);
}
