package com.robotics.education.school;

import com.robotics.education.auth.AdminUser;
import jakarta.persistence.*;

@Entity
@Table(name = "classroom_memberships", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "classroom_id"}))
public class ClassroomMembership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AdminUser user;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "classroom_id", nullable = false)
    private Classroom classroom;

    protected ClassroomMembership() {}

    public ClassroomMembership(AdminUser user, Classroom classroom) {
        this.user = user;
        this.classroom = classroom;
    }

    public Long getId() { return id; }
    public AdminUser getUser() { return user; }
    public Classroom getClassroom() { return classroom; }
}
