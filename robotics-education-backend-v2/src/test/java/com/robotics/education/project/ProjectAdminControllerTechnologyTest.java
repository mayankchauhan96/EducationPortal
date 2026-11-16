package com.robotics.education.project;

import com.robotics.education.program.ProgramProjectLinkService;
import com.robotics.education.technology.Technology;
import com.robotics.education.technology.TechnologyRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ProjectAdminControllerTechnologyTest {
    @Test
    void assignsMultipleTechnologiesAndPrimaryTechnology() {
        ProjectRepository projects = mock(ProjectRepository.class);
        ProgramProjectLinkService programLinks = mock(ProgramProjectLinkService.class);
        TechnologyRepository technologies = mock(TechnologyRepository.class);
        Technology first = mock(Technology.class);
        Technology primary = mock(Technology.class);
        when(first.getId()).thenReturn(2L);
        when(primary.getId()).thenReturn(5L);
        when(technologies.findAllById(Set.of(2L, 5L))).thenReturn(List.of(first, primary));
        when(projects.save(org.mockito.ArgumentMatchers.any(Project.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));

        ProjectAdminController controller = new ProjectAdminController(projects, programLinks, technologies);
        ProjectAdminController.Request request = new ProjectAdminController.Request(
            "Project", "project", "Description", null, null, null, null, null, null,
            0, true, Set.of(), Set.of(2L, 5L), 5L
        );

        ProjectAdminController.Response response = controller.create(request).data();

        assertEquals(List.of(2L, 5L), response.technologyIds());
        assertEquals(5L, response.primaryTechnologyId());
    }

    @Test
    void rejectsPrimaryTechnologyOutsideSelectedSections() {
        ProjectRepository projects = mock(ProjectRepository.class);
        ProgramProjectLinkService programLinks = mock(ProgramProjectLinkService.class);
        TechnologyRepository technologies = mock(TechnologyRepository.class);
        when(projects.save(org.mockito.ArgumentMatchers.any(Project.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));

        ProjectAdminController controller = new ProjectAdminController(projects, programLinks, technologies);
        ProjectAdminController.Request request = new ProjectAdminController.Request(
            "Project", "project", "Description", null, null, null, null, null, null,
            0, true, Set.of(), Set.of(), 5L
        );

        assertThrows(IllegalArgumentException.class, () -> controller.create(request));
    }
}
