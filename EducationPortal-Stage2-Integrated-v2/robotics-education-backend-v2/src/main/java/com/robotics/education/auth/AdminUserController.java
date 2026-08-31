package com.robotics.education.auth;

import com.robotics.education.common.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {
    public record CreateUserRequest(@NotBlank @Email String email,@NotBlank @Size(min=8,max=100) String password,Role role){}
    public record UserResponse(Long id,String email,String role,boolean active){}
    private final AdminUserRepository users; private final PasswordEncoder encoder;
    public AdminUserController(AdminUserRepository users,PasswordEncoder encoder){this.users=users;this.encoder=encoder;}

    @GetMapping public ApiResponse<List<UserResponse>> list(){
        return ApiResponse.ok(users.findAll().stream().map(this::r).toList());
    }

    @PostMapping public ApiResponse<UserResponse> create(@Valid @RequestBody CreateUserRequest x){
        if(users.findByEmailIgnoreCase(x.email()).isPresent()) throw new IllegalArgumentException("Email already exists");
        Role role=x.role()==null?Role.EDITOR:x.role();
        AdminUser u=users.save(new AdminUser(x.email(),encoder.encode(x.password()),role));
        return ApiResponse.created(r(u));
    }

    @PatchMapping("/{id}/active") public ApiResponse<UserResponse> active(@PathVariable Long id,@RequestParam boolean value){
        AdminUser u=users.findById(id).orElseThrow(()->new ResourceNotFoundException("Admin user not found"));
        u.setActive(value); return ApiResponse.ok(r(users.save(u)));
    }
    private UserResponse r(AdminUser u){return new UserResponse(u.getId(),u.getEmail(),u.getRole().name(),u.isActive());}
}
