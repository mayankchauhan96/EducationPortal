package com.robotics.education.auth;

import com.robotics.education.common.ApiResponse;
import com.robotics.education.common.ResourceNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {
    public record CreateUserRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, max = 100) String password,
        Role role
    ) {}

    public record UserResponse(Long id, String email, String role, boolean active) {}

    private final AdminUserRepository users;
    private final PasswordEncoder encoder;

    public AdminUserController(AdminUserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    @GetMapping
    public ApiResponse<List<UserResponse>> list() {
        return ApiResponse.ok(users.findAll().stream().map(this::map).toList());
    }

    @PostMapping
    public ApiResponse<UserResponse> create(@Valid @RequestBody CreateUserRequest request) {
        if (users.findByEmailIgnoreCase(request.email()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        Role role = request.role() == null ? Role.EDITOR : request.role();
        AdminUser user = new AdminUser(request.email(), encoder.encode(request.password()), role);
        return ApiResponse.ok("Admin user created", map(users.save(user)));
    }

    @PatchMapping("/{id}/active")
    public ApiResponse<UserResponse> updateActive(@PathVariable Long id, @RequestParam boolean value) {
        AdminUser user = users.findById(id).orElseThrow(() -> new ResourceNotFoundException("Admin user not found"));
        user.setActive(value);
        return ApiResponse.ok(map(users.save(user)));
    }

    private UserResponse map(AdminUser user) {
        return new UserResponse(user.getId(), user.getEmail(), user.getRole().name(), user.isActive());
    }
}
