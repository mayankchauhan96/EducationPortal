package com.robotics.education.program;
import com.robotics.education.common.ApiResponse;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/api/programs")
public class ProgramController{
 private final ProgramService service;
 public ProgramController(ProgramService service){this.service=service;}
 @GetMapping public ApiResponse<List<ProgramResponse>> getAll(){return ApiResponse.ok(service.getPublished());}
 @GetMapping("/{slug}") public ApiResponse<ProgramResponse> getOne(@PathVariable String slug){return ApiResponse.ok(service.getBySlug(slug));}
}