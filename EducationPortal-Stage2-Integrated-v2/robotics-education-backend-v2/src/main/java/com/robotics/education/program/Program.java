package com.robotics.education.program;
import com.robotics.education.common.AuditableEntity;
import com.robotics.education.project.Project;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity @Table(name="programs")
public class Program extends AuditableEntity {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=120) private String title;
 @Column(nullable=false,unique=true,length=140) private String slug;
 @Column(nullable=false,length=1000) private String description;
 @Column(length=80) private String ageGroup;
 @Column(length=120) private String tag;
 @Column(length=255) private String imageUrl;
 @Column(nullable=false) private boolean published=true;
 @Column(nullable=false) private Integer displayOrder=0;

 @ManyToMany(fetch = FetchType.LAZY)
 @JoinTable(
   name = "program_projects",
   joinColumns = @JoinColumn(name = "program_id"),
   inverseJoinColumns = @JoinColumn(name = "project_id")
 )
 private Set<Project> projects = new HashSet<>();

 public Long getId(){return id;} public String getTitle(){return title;} public void setTitle(String v){title=v;}
 public String getSlug(){return slug;} public void setSlug(String v){slug=v;} public String getDescription(){return description;} public void setDescription(String v){description=v;}
 public String getAgeGroup(){return ageGroup;} public void setAgeGroup(String v){ageGroup=v;} public String getTag(){return tag;} public void setTag(String v){tag=v;}
 public String getImageUrl(){return imageUrl;} public void setImageUrl(String v){imageUrl=v;} public boolean isPublished(){return published;} public void setPublished(boolean v){published=v;}
 public Integer getDisplayOrder(){return displayOrder;} public void setDisplayOrder(Integer v){displayOrder=v;}
 public Set<Project> getProjects(){ return projects; } public void setProjects(Set<Project> projects){ this.projects = projects; }
}