package com.robotics.education.school;

import com.robotics.education.auth.AdminUser;
import jakarta.persistence.*;

@Entity
@Table(name = "principal_schools", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "school_id"}))
public class PrincipalSchool {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AdminUser user;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    protected PrincipalSchool() {}

    public PrincipalSchool(AdminUser user, School school) {
        this.user = user;
        this.school = school;
    }

    public Long getId() { return id; }
    public AdminUser getUser() { return user; }
    public School getSchool() { return school; }
}
