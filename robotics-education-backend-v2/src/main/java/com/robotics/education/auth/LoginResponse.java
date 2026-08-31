package com.robotics.education.auth;

public record LoginResponse(String token, String email, String role) {}
