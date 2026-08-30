package com.robotics.education.lead;
import com.robotics.education.common.AuditableEntity;
import jakarta.persistence.*;

@Entity @Table(name="demo_requests")
public class DemoRequest extends AuditableEntity {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=120) private String contactName; @Column(nullable=false,length=160) private String schoolName;
 @Column(nullable=false,length=160) private String email; @Column(length=30) private String phone; @Column(length=100) private String city;
 @Column(length=100) private String role; @Column(length=30) private String studentCount; @Column(length=100) private String grades; @Column(length=1000) private String message;
 @Enumerated(EnumType.STRING) @Column(nullable=false,length=30) private LeadStatus status=LeadStatus.NEW;
 public Long getId(){return id;} public String getContactName(){return contactName;} public void setContactName(String v){contactName=v;}
 public String getSchoolName(){return schoolName;} public void setSchoolName(String v){schoolName=v;} public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getPhone(){return phone;} public void setPhone(String v){phone=v;} public String getCity(){return city;} public void setCity(String v){city=v;}
 public String getRole(){return role;} public void setRole(String v){role=v;} public String getStudentCount(){return studentCount;} public void setStudentCount(String v){studentCount=v;}
 public String getGrades(){return grades;} public void setGrades(String v){grades=v;} public String getMessage(){return message;} public void setMessage(String v){message=v;}
 public LeadStatus getStatus(){return status;} public void setStatus(LeadStatus v){status=v;}
}