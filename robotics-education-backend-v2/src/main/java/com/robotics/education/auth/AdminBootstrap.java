package com.robotics.education.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class AdminBootstrap implements ApplicationRunner {
    private final AdminUserRepository users;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:admin@local.test}")
    private String adminEmail;

    @Value("${app.admin.password:change-me-local-only}")
    private String adminPassword;

    public AdminBootstrap(AdminUserRepository users, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        String normalizedEmail = adminEmail == null ? "admin@local.test" : adminEmail.trim();
        String normalizedPassword = adminPassword == null ? "change-me-local-only" : adminPassword.trim();

        users.findByEmailIgnoreCase(normalizedEmail).ifPresentOrElse(
            user -> {
                if (!user.isActive()) {
                    user.setActive(true);
                    users.save(user);
                }
            },
            () -> users.save(new AdminUser(normalizedEmail, passwordEncoder.encode(normalizedPassword), Role.ADMIN))
        );

        if (normalizedEmail.toLowerCase(Locale.ROOT).contains("local.test") && normalizedPassword.equals("change-me-local-only")) {
            System.out.println("Local dev admin seeded: " + normalizedEmail + " / " + normalizedPassword);
        }
    }
}
