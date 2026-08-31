package com.robotics.education.auth;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name="admin_users")
public class AdminUser {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false,unique=true,length=150) private String email;
    @Column(name="password_hash",nullable=false,length=255) private String passwordHash;
    @Enumerated(EnumType.STRING) @Column(nullable=false,length=20) private Role role;
    @Column(nullable=false) private boolean active=true;
    @Column(nullable=false) private OffsetDateTime createdAt;
    @Column(nullable=false) private OffsetDateTime updatedAt;

    protected AdminUser(){}
    public AdminUser(String email,String passwordHash,Role role){
        this.email=email;this.passwordHash=passwordHash;this.role=role;
        this.createdAt=OffsetDateTime.now();this.updatedAt=this.createdAt;
    }
    @PreUpdate void touch(){updatedAt=OffsetDateTime.now();}
    public Long getId(){return id;} public String getEmail(){return email;} public String getPasswordHash(){return passwordHash;}
    public Role getRole(){return role;} public boolean isActive(){return active;} public void setActive(boolean v){active=v;}
}
