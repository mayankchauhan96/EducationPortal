package com.robotics.education.common;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import java.time.OffsetDateTime;

public class AuditListener {
    @PrePersist public void onCreate(Object entity) {
        if (entity instanceof AuditableEntity a) {
            OffsetDateTime now = OffsetDateTime.now();
            a.setCreatedAt(now); a.setUpdatedAt(now);
        }
    }
    @PreUpdate public void onUpdate(Object entity) {
        if (entity instanceof AuditableEntity a) a.setUpdatedAt(OffsetDateTime.now());
    }
}
