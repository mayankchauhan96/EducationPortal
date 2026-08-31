package com.robotics.education.contact;
import com.robotics.education.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/api/contact")
public class ContactController{
 private final ContactRequestRepository repository;
 public ContactController(ContactRequestRepository repository){this.repository=repository;}
 @PostMapping public ApiResponse<Map<String,Long>> create(@Valid @RequestBody ContactCreateRequest r){
  ContactRequest c=new ContactRequest(); c.setName(r.name()); c.setEmail(r.email()); c.setPhone(r.phone()); c.setSchoolName(r.schoolName()); c.setMessage(r.message());
  Long id=repository.save(c).getId(); return ApiResponse.ok("Your message has been received",Map.of("id",id));
 }
}