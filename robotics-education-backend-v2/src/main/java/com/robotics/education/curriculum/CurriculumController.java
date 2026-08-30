package com.robotics.education.curriculum;
import com.robotics.education.common.ApiResponse;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/api/curriculum")
public class CurriculumController{
 private final CurriculumService service;
 public CurriculumController(CurriculumService service){this.service=service;}
 @GetMapping public ApiResponse<List<CurriculumResponse>> getAll(){return ApiResponse.ok(service.getPublished());}
 @GetMapping("/{slug}") public ApiResponse<CurriculumResponse> getOne(@PathVariable String slug){return ApiResponse.ok(service.getBySlug(slug));}
}