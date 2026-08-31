package com.robotics.education.contact;

import com.robotics.education.common.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/contacts")
@PreAuthorize("hasAnyRole('ADMIN','EDITOR')")
public class AdminContactController {
    public record Response(Long id, String name, String email, String phone, String schoolName,
                           String message, String status, java.time.OffsetDateTime createdAt) {}
    private final ContactRequestRepository repo;

    public AdminContactController(ContactRequestRepository repo){this.repo=repo;}

    @GetMapping
    public ApiResponse<List<Response>> list(){
        return ApiResponse.ok(repo.findAll().stream().map(this::map).toList());
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<Response> status(@PathVariable Long id,@RequestParam String value){
        ContactRequest c=repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Contact request not found"));
        c.setStatus(value.toUpperCase());
        return ApiResponse.ok(map(repo.save(c)));
    }

    private Response map(ContactRequest c){
        return new Response(c.getId(),c.getName(),c.getEmail(),c.getPhone(),c.getSchoolName(),c.getMessage(),c.getStatus(),c.getCreatedAt());
    }
}