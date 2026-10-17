package com.robotics.education.progress;

import com.robotics.education.auth.AdminUser;
import com.robotics.education.curriculum.CurriculumLesson;
import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "student_lesson_progress", uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "lesson_id"}))
public class StudentLessonProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private AdminUser student;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private CurriculumLesson lesson;

    @Column(nullable = false)
    private boolean completed;

    @Column(length = 1000)
    private String notes;

    @Column(name = "updated_by", nullable = false, length = 150)
    private String updatedBy;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    protected StudentLessonProgress() {}

    public StudentLessonProgress(AdminUser student, CurriculumLesson lesson, String updatedBy) {
        this.student = student;
        this.lesson = lesson;
        this.updatedBy = updatedBy;
        this.updatedAt = OffsetDateTime.now();
    }

    @PrePersist
    @PreUpdate
    public void touch() { updatedAt = OffsetDateTime.now(); }

    public Long getId() { return id; }
    public AdminUser getStudent() { return student; }
    public CurriculumLesson getLesson() { return lesson; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
}
