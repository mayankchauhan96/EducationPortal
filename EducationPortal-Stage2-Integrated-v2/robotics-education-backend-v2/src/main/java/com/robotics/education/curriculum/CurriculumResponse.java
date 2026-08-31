package com.robotics.education.curriculum;

import com.robotics.education.program.ProgramResponse;
import java.util.List;

public record CurriculumResponse(Long id, String slug, String levelName, String gradeRange, String learningObjectives, String skills, String imageUrl, boolean published, Integer displayOrder, List<ProgramResponse> programs) {}