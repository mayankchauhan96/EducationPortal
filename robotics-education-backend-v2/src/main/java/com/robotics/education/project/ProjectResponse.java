package com.robotics.education.project;

import java.util.List;

public record ProjectResponse(
    Long id,
    String title,
    String slug,
    String description,
    String difficulty,
    String gradeRange,
    String skills,
    String imageUrl,
    String listImageUrl,
    String videoUrl,
    boolean published,
    List<String> technologySlugs,
    String primaryTechnologySlug
) {}