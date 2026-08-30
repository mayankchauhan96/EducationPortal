package com.robotics.education.curriculum;
import com.robotics.education.common.AuditableEntity;
import com.robotics.education.program.Program;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity @Table(name="curriculum")
public class Curriculum extends AuditableEntity {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=100) private String levelName;
 @Column(nullable=false, unique = true, length=100) private String slug;
 @Column(nullable=false,length=50) private String gradeRange;
 @Column(length=1000) private String learningObjectives; @Column(length=1000) private String skills; @Column(length=255) private String imageUrl;
 @Column(nullable=false) private boolean published=true; @Column(nullable=false) private Integer displayOrder=0;

 @ManyToMany(fetch = FetchType.LAZY)
 @JoinTable(
   name = "curriculum_programs",
   joinColumns = @JoinColumn(name = "curriculum_id"),
   inverseJoinColumns = @JoinColumn(name = "program_id")
 )
 private Set<Program> programs = new HashSet<>();

 public Long getId(){return id;} public String getLevelName(){return levelName;} public void setLevelName(String v){levelName=v;}
 public String getSlug(){return slug;} public void setSlug(String v){slug=v;}
 public String getGradeRange(){return gradeRange;} public void setGradeRange(String v){gradeRange=v;} public String getLearningObjectives(){return learningObjectives;} public void setLearningObjectives(String v){learningObjectives=v;}
 public String getSkills(){return skills;} public void setSkills(String v){skills=v;} public String getImageUrl(){return imageUrl;} public void setImageUrl(String v){imageUrl=v;}
 public boolean isPublished(){return published;} public void setPublished(boolean v){published=v;} public Integer getDisplayOrder(){return displayOrder;} public void setDisplayOrder(Integer v){displayOrder=v;}
 public Set<Program> getPrograms(){ return programs; } public void setPrograms(Set<Program> programs){ this.programs = programs; }
}