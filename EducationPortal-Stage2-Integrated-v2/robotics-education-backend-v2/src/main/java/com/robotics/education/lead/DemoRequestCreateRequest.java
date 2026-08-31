package com.robotics.education.lead;
import jakarta.validation.constraints.*;
public record DemoRequestCreateRequest(
 @NotBlank @Size(max=120) String contactName,
 @NotBlank @Size(max=160) String schoolName,
 @NotBlank @Email @Size(max=160) String email,
 @Size(max=30) String phone, @Size(max=100) String city, @Size(max=100) String role,
 @Size(max=30) String studentCount, @Size(max=100) String grades, @Size(max=1000) String message) {}
