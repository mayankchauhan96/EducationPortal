package com.robotics.education.pagecontent;

public record PageContentAdminResponse(
    Long id,
    String pageKey,
    String sectionTitle,
    String sectionBody,
    String bullets,
    Integer displayOrder,
    String category,
    String imageUrl,
    String imageAltText,
    String attribution,
    boolean published
) {}
