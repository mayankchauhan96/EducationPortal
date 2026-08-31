package com.robotics.education.contact;
import jakarta.validation.constraints.*;
public record ContactCreateRequest(
 @NotBlank @Size(max=120) String name,
 @NotBlank @Email @Size(max=160) String email,
 @Size(max=30) String phone, @Size(max=160) String schoolName,
 @NotBlank @Size(max=1500) String message) {}
