package com.robotics.education.project;
import com.robotics.education.common.ApiResponse;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/api/projects")
public class ProjectController{
 private final ProjectService service;
 public ProjectController(ProjectService service){this.service=service;}
 @GetMapping public ApiResponse<List<ProjectResponse>> getAll(){return ApiResponse.ok(service.getPublished());}
 @GetMapping("/{slug}") public ApiResponse<ProjectResponse> getOne(@PathVariable String slug){return ApiResponse.ok(service.getBySlug(slug));}
}