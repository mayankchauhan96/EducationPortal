package com.robotics.education.project;
import com.robotics.education.common.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.util.*;
@Service
public class ProjectService{
 private final ProjectRepository repository;
 public ProjectService(ProjectRepository repository){this.repository=repository;}
 public List<ProjectResponse> getPublished(){return repository.findAllByPublishedTrueOrderByIdDesc().stream().map(this::map).toList();}
 public ProjectResponse getBySlug(String slug){return repository.findBySlugAndPublishedTrue(slug).map(this::map).orElseThrow(()->new ResourceNotFoundException("Project not found: "+slug));}
 private ProjectResponse map(Project p){return new ProjectResponse(p.getId(),p.getTitle(),p.getSlug(),p.getDescription(),p.getDifficulty(),p.getGradeRange(),p.getSkills(),p.getImageUrl(),p.getVideoUrl(),p.isPublished());}
}