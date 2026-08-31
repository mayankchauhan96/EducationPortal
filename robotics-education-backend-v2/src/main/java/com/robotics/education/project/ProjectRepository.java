package com.robotics.education.project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface ProjectRepository extends JpaRepository<Project,Long>{
 List<Project> findAllByPublishedTrueOrderByIdDesc();
 Optional<Project> findBySlugAndPublishedTrue(String slug);
 boolean existsBySlug(String slug);
 Optional<Project> findBySlug(String slug);
}