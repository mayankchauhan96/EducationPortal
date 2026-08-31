package com.robotics.education.program;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface ProgramRepository extends JpaRepository<Program,Long>{
 List<Program> findAllByPublishedTrueOrderByDisplayOrderAsc();
 Optional<Program> findBySlugAndPublishedTrue(String slug);
}