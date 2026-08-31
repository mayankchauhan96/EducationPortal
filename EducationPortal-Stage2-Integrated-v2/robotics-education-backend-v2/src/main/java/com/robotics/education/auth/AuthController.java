package com.robotics.education.auth;

import com.robotics.education.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AdminUserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
    public AuthController(AdminUserRepository users,PasswordEncoder encoder,JwtService jwt){this.users=users;this.encoder=encoder;this.jwt=jwt;}

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request){
        AdminUser user=users.findByEmailIgnoreCase(request.email())
                .orElseThrow(()->new IllegalArgumentException("Invalid email or password"));
        if(!user.isActive() || !encoder.matches(request.password(),user.getPasswordHash()))
            throw new IllegalArgumentException("Invalid email or password");
        return ApiResponse.ok(new LoginResponse(jwt.generate(user),user.getEmail(),user.getRole().name()));
    }
}
