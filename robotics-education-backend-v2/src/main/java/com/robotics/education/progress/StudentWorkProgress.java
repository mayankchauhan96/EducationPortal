package com.robotics.education.progress;

import com.robotics.education.auth.AdminUser;
import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "student_work_progress")
public class StudentWorkProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private AdminUser student;

    @Enumerated(EnumType.STRING)
    @Column(name = "work_type", nullable = false, length = 20)
    private WorkType workType;

    @Column(nullable = false, length = 160)
    private String title;

    @Column(nullable = false)
    private boolean completed;

    @Column(length = 1000)
    private String notes;

    @Column(name = "updated_by", nullable = false, length = 150)
    private String updatedBy;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    protected StudentWorkProgress() {}

    public StudentWorkProgress(AdminUser student, WorkType workType, String title, String updatedBy) {
        this.student = student;
        this.workType = workType;
        this.title = title;
        this.updatedBy = updatedBy;
        this.updatedAt = OffsetDateTime.now();
    }

    @PrePersist
    @PreUpdate
    public void touch() { updatedAt = OffsetDateTime.now(); }

    public Long getId() { return id; }
    public AdminUser getStudent() { return student; }
    public WorkType getWorkType() { return workType; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }

    public enum WorkType {
        PROJECT,
        ASSIGNMENT
    }
}
