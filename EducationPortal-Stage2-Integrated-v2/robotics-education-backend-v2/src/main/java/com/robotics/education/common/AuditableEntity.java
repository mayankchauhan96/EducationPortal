package com.robotics.education.common;
import jakarta.persistence.*;

@MappedSuperclass
@EntityListeners(AuditListener.class)
public abstract class AuditableEntity {
    @Column(nullable=false, updatable=false) private java.time.OffsetDateTime createdAt;
    @Column(nullable=false) private java.time.OffsetDateTime updatedAt;
    public java.time.OffsetDateTime getCreatedAt(){return createdAt;}
    public void setCreatedAt(java.time.OffsetDateTime v){createdAt=v;}
    public java.time.OffsetDateTime getUpdatedAt(){return updatedAt;}
    public void setUpdatedAt(java.time.OffsetDateTime v){updatedAt=v;}
}
