package com.robotics.education.contact;
import com.robotics.education.common.AuditableEntity;
import jakarta.persistence.*;

@Entity @Table(name="contact_requests")
public class ContactRequest extends AuditableEntity {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=120) private String name; @Column(nullable=false,length=160) private String email;
 @Column(length=30) private String phone; @Column(length=160) private String schoolName; @Column(nullable=false,length=1500) private String message;
 @Column(nullable=false,length=30) private String status="NEW";
 public Long getId(){return id;} public String getName(){return name;} public void setName(String v){name=v;} public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getPhone(){return phone;} public void setPhone(String v){phone=v;} public String getSchoolName(){return schoolName;} public void setSchoolName(String v){schoolName=v;}
 public String getMessage(){return message;} public void setMessage(String v){message=v;} public String getStatus(){return status;} public void setStatus(String v){status=v;}
}