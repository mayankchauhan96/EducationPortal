package com.robotics.education.curriculum;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface CurriculumRepository extends JpaRepository<Curriculum,Long>{
 List<Curriculum> findAllByPublishedTrueOrderByDisplayOrderAsc();
 Optional<Curriculum> findBySlugAndPublishedTrue(String slug);
 Optional<Curriculum> findBySlug(String slug);
}