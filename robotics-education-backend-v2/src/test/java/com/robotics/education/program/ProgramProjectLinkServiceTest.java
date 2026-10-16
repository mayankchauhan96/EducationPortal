package com.robotics.education.program;

import com.robotics.education.common.ResourceNotFoundException;
import com.robotics.education.project.Project;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProgramProjectLinkServiceTest {
    @Mock
    private ProgramRepository programs;

    @Test
    void assignsSelectedProgramsRegardlessOfGradeRanges() {
        Program previouslySelected = new Program();
        Program selected = new Program();
        selected.setAgeGroup("Grades 1-2");
        Project project = new Project();
        project.setGradeRange("Grades 10-12");
        project.getPrograms().add(previouslySelected);
        previouslySelected.getProjects().add(project);
        when(programs.findAllById(Set.of(12L))).thenReturn(List.of(selected));

        new ProgramProjectLinkService(programs).setPrograms(project, Set.of(12L));

        assertEquals(Set.of(selected), project.getPrograms());
        assertTrue(previouslySelected.getProjects().isEmpty());
        assertEquals(Set.of(project), selected.getProjects());
    }

    @Test
    void emptySelectionRemovesAllProgramLinks() {
        Program previouslySelected = new Program();
        Project project = new Project();
        project.getPrograms().add(previouslySelected);
        previouslySelected.getProjects().add(project);

        new ProgramProjectLinkService(programs).setPrograms(project, Set.of());

        assertTrue(project.getPrograms().isEmpty());
        assertTrue(previouslySelected.getProjects().isEmpty());
    }

    @Test
    void rejectsUnknownProgramIdsWithoutChangingExistingLinks() {
        Program previouslySelected = new Program();
        Project project = new Project();
        project.getPrograms().add(previouslySelected);
        previouslySelected.getProjects().add(project);
        when(programs.findAllById(Set.of(12L, 34L))).thenReturn(List.of(new Program()));

        assertThrows(
            ResourceNotFoundException.class,
            () -> new ProgramProjectLinkService(programs).setPrograms(project, Set.of(12L, 34L))
        );

        assertEquals(Set.of(previouslySelected), project.getPrograms());
        assertEquals(Set.of(project), previouslySelected.getProjects());
        verify(programs).findAllById(Set.of(12L, 34L));
    }
}
