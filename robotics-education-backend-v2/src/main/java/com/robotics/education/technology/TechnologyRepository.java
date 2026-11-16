package com.robotics.education.technology;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TechnologyRepository extends JpaRepository<Technology, Long> {
    List<Technology> findAllByPublishedTrueOrderByDisplayOrderAscIdAsc();
    boolean existsBySlug(String slug);
}
