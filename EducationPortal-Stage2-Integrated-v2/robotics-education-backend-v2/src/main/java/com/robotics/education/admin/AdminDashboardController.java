package com.robotics.education.admin;

import com.robotics.education.common.ApiResponse;
import com.robotics.education.contact.ContactRequestRepository;
import com.robotics.education.curriculum.CurriculumRepository;
import com.robotics.education.lead.DemoRequestRepository;
import com.robotics.education.pagecontent.PageContentRepository;
import com.robotics.education.program.ProgramRepository;
import com.robotics.education.project.ProjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {
    private final ProgramRepository programs;
    private final ProjectRepository projects;
    private final CurriculumRepository curriculum;
    private final PageContentRepository pages;
    private final ContactRequestRepository contacts;
    private final DemoRequestRepository demos;

    public AdminDashboardController(ProgramRepository programs, ProjectRepository projects,
                                    CurriculumRepository curriculum, PageContentRepository pages,
                                    ContactRequestRepository contacts, DemoRequestRepository demos) {
        this.programs=programs; this.projects=projects; this.curriculum=curriculum; this.pages=pages;
        this.contacts=contacts; this.demos=demos;
    }

    @GetMapping
    public ApiResponse<Map<String,Long>> get() {
        return ApiResponse.ok(Map.of(
            "programs", programs.count(),
            "projects", projects.count(),
            "curriculum", curriculum.count(),
            "pageSections", pages.count(),
            "contactRequests", contacts.count(),
            "demoRequests", demos.count()
        ));
    }
}
