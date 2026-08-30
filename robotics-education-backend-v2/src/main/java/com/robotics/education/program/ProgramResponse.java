package com.robotics.education.program;

import com.robotics.education.project.ProjectResponse;
import java.util.List;

public record ProgramResponse(Long id, String title, String slug, String description, String ageGroup, String tag, String imageUrl, boolean published, Integer displayOrder, List<ProjectResponse> projects) {}