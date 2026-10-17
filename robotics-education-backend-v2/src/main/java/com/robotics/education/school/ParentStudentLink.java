package com.robotics.education.school;

import com.robotics.education.auth.AdminUser;
import jakarta.persistence.*;

@Entity
@Table(name = "parent_student_links", uniqueConstraints = @UniqueConstraint(columnNames = {"parent_id", "student_id"}))
public class ParentStudentLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = false)
    private AdminUser parent;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private AdminUser student;

    protected ParentStudentLink() {}

    public ParentStudentLink(AdminUser parent, AdminUser student) {
        this.parent = parent;
        this.student = student;
    }

    public Long getId() { return id; }
    public AdminUser getParent() { return parent; }
    public AdminUser getStudent() { return student; }
}
