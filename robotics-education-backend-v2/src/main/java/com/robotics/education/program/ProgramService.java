package com.robotics.education.program;
import com.robotics.education.common.ResourceNotFoundException;
import com.robotics.education.project.Project;
import com.robotics.education.project.ProjectRepository;
import com.robotics.education.project.ProjectResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
@Service
@Transactional(readOnly = true)
public class ProgramService {
 private final ProgramRepository repository;
 public ProgramService(ProgramRepository repository){this.repository=repository;}
 public List<ProgramResponse> getPublished(){return repository.findAllByPublishedTrueOrderByDisplayOrderAsc().stream().map(this::map).toList();}
 public ProgramResponse getBySlug(String slug){return repository.findBySlugAndPublishedTrue(slug).map(this::map).orElseThrow(()->new ResourceNotFoundException("Program not found: "+slug));}
 private ProgramResponse map(Program p){
  List<ProjectResponse> projects = resolveProjects(p);
  return new ProgramResponse(p.getId(), p.getTitle(), p.getSlug(), p.getDescription(), p.getAgeGroup(), p.getTag(), p.getImageUrl(), p.isPublished(), p.getDisplayOrder(), projects);
 }
 private List<ProjectResponse> resolveProjects(Program p){
  List<Project> linked = p.getProjects() == null ? List.of() : p.getProjects().stream().sorted(Comparator.comparing(project -> project.getTitle().toLowerCase())).toList();
  return linked.stream()
    .map(project -> new ProjectResponse(project.getId(), project.getTitle(), project.getSlug(), project.getDescription(), project.getDifficulty(), project.getGradeRange(), project.getSkills(), project.getImageUrl(), project.getVideoUrl(), project.isPublished()))
    .toList();
 }
}