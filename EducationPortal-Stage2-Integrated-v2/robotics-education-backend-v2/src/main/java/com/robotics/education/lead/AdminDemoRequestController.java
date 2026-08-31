package com.robotics.education.lead;

import com.robotics.education.common.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/demo-requests")
@PreAuthorize("hasAnyRole('ADMIN','EDITOR')")
public class AdminDemoRequestController {
    public record Response(Long id,String contactName,String schoolName,String email,String phone,String city,String role,
                           String studentCount,String grades,String message,LeadStatus status,java.time.OffsetDateTime createdAt) {}
    private final DemoRequestRepository repo;
    public AdminDemoRequestController(DemoRequestRepository repo){this.repo=repo;}

    @GetMapping
    public ApiResponse<List<Response>> list(){
        return ApiResponse.ok(repo.findAll().stream().map(this::map).toList());
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<Response> status(@PathVariable Long id,@RequestParam LeadStatus value){
        DemoRequest d=repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Demo request not found"));
        d.setStatus(value);return ApiResponse.ok(map(repo.save(d)));
    }

    private Response map(DemoRequest d){
        return new Response(d.getId(),d.getContactName(),d.getSchoolName(),d.getEmail(),d.getPhone(),d.getCity(),d.getRole(),
            d.getStudentCount(),d.getGrades(),d.getMessage(),d.getStatus(),d.getCreatedAt());
    }
}
