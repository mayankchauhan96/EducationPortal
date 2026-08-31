package com.robotics.education.pagecontent;

public record PageContentResponse(
    Long id,
    String pageKey,
    String sectionTitle,
    String sectionBody,
    String bullets,
    Integer displayOrder
) {}
