package com.robotics.education.lead;
import com.robotics.education.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/api/demo-requests")
public class DemoRequestController{
 private final DemoRequestRepository repository;
 public DemoRequestController(DemoRequestRepository repository){this.repository=repository;}
 @PostMapping public ApiResponse<Map<String,Long>> create(@Valid @RequestBody DemoRequestCreateRequest r){
  DemoRequest d=new DemoRequest(); d.setContactName(r.contactName()); d.setSchoolName(r.schoolName()); d.setEmail(r.email());
  d.setPhone(r.phone()); d.setCity(r.city()); d.setRole(r.role()); d.setStudentCount(r.studentCount()); d.setGrades(r.grades()); d.setMessage(r.message());
  Long id=repository.save(d).getId(); return ApiResponse.ok("Demo request submitted successfully",Map.of("id",id));
 }
}