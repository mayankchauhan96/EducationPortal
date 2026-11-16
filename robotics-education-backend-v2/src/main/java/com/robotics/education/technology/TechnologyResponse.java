package com.robotics.education.technology;

public record TechnologyResponse(
    Long id,
    String slug,
    String title,
    String icon,
    String description,
    String overview,
    String topics,
    String resourceLabel,
    String resourceUrl,
    Integer displayOrder,
    boolean published
) {}
