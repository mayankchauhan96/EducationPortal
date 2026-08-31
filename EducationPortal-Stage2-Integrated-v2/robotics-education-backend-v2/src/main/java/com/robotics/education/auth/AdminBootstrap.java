package com.robotics.education.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminBootstrap implements ApplicationRunner {
    private final AdminUserRepository users; private final PasswordEncoder encoder;
    @Value("${app.admin.email:admin@robotics.local}") private String email;
    @Value("${app.admin.password:Admin@12345}") private String password;
    public AdminBootstrap(AdminUserRepository users,PasswordEncoder encoder){this.users=users;this.encoder=encoder;}
    @Override public void run(ApplicationArguments args){
        if(users.findByEmailIgnoreCase(email).isEmpty()){
            users.save(new AdminUser(email,encoder.encode(password),Role.ADMIN));
        }
    }
}
