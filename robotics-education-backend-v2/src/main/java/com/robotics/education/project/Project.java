package com.robotics.education.project;
import com.robotics.education.common.AuditableEntity;
import com.robotics.education.program.Program;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity @Table(name="projects")
public class Project extends AuditableEntity {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=160) private String title;
 @Column(nullable=false,unique=true,length=180) private String slug;
 @Column(nullable=false,length=1000) private String description;
 @Column(length=40) private String difficulty; @Column(length=80) private String gradeRange;
 @Column(length=255) private String skills; @Column(length=255) private String imageUrl; @Column(length=255) private String videoUrl;
 @Column(name="display_order",nullable=false) private Integer displayOrder=0;
 @Column(nullable=false) private boolean published=true;

 @ManyToMany(mappedBy = "projects", fetch = FetchType.LAZY)
 private Set<Program> programs = new HashSet<>();

 public Long getId(){return id;} public String getTitle(){return title;} public void setTitle(String v){title=v;}
 public String getSlug(){return slug;} public void setSlug(String v){slug=v;} public String getDescription(){return description;} public void setDescription(String v){description=v;}
 public String getDifficulty(){return difficulty;} public void setDifficulty(String v){difficulty=v;} public String getGradeRange(){return gradeRange;} public void setGradeRange(String v){gradeRange=v;}
 public String getSkills(){return skills;} public void setSkills(String v){skills=v;} public String getImageUrl(){return imageUrl;} public void setImageUrl(String v){imageUrl=v;}
 public String getVideoUrl(){return videoUrl;} public void setVideoUrl(String v){videoUrl=v;} public Integer getDisplayOrder(){return displayOrder;} public void setDisplayOrder(Integer v){displayOrder=v;}
 public boolean isPublished(){return published;} public void setPublished(boolean v){published=v;}
 public Set<Program> getPrograms(){ return programs; } public void setPrograms(Set<Program> programs){ this.programs = programs; }
}