package com.robotics.education.pagecontent;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PageContentControllerTest {
    @Mock
    private PageContentRepository repository;

    @Test
    void testimonialsPageIncludesAllTestimonialSections() {
        PageContent studentStory = content(1L, "testimonials-students", "Student story", "https://example.com/student.jpg");
        PageContent labStory = content(2L, "testimonials-labs", "Lab story", "https://example.com/lab.jpg");
        when(repository.findAllByPageKeyInAndPublishedTrueOrderByDisplayOrderAsc(List.of(
            "testimonials",
            "testimonials-partner-schools",
            "testimonials-students",
            "testimonials-labs",
            "testimonials-community",
            "testimonials-workshops",
            "testimonials-awards",
            "testimonials-others"
        ))).thenReturn(List.of(studentStory, labStory));

        var response = new PageContentController(repository).getPageContent("testimonials");

        assertEquals(List.of("Student story", "Lab story"), response.data().stream()
            .map(PageContentResponse::sectionTitle)
            .toList());
    }

    @Test
    void testimonialSubpageOnlyLoadsItsOwnContentKey() {
        PageContent studentStory = content(1L, "testimonials-students", "Student story", null);
        PageContent secondStudentStory = content(2L, "testimonials-students", "Second student story", null);
        when(repository.findAllByPageKeyAndPublishedTrueOrderByDisplayOrderAsc("testimonials-students"))
            .thenReturn(List.of(studentStory, secondStudentStory));

        var response = new PageContentController(repository).getPageContent("testimonials-students");

        assertEquals(List.of("Student story", "Second student story"), response.data().stream()
            .map(PageContentResponse::sectionTitle)
            .toList());
        verify(repository).findAllByPageKeyAndPublishedTrueOrderByDisplayOrderAsc("testimonials-students");
    }

    @Test
    void featuredStoriesIncludeEveryEntryAcrossTestimonialSections() {
        PageContent studentStory = content(1L, "testimonials-students", "Student story", "https://example.com/student.jpg");
        PageContent secondStudentStory = content(2L, "testimonials-students", "Second student story", null);
        PageContent labStory = content(3L, "testimonials-labs", "Lab story", " ");
        PageContent workshopStory = content(4L, "testimonials-workshops", "Workshop story", null);
        PageContent awardStory = content(5L, "testimonials-awards", "Award story", null);
        when(repository.findAllByPageKeyInAndPublishedTrueOrderByDisplayOrderAsc(List.of(
            "testimonials",
            "testimonials-partner-schools",
            "testimonials-students",
            "testimonials-labs",
            "testimonials-community",
            "testimonials-workshops",
            "testimonials-awards",
            "testimonials-others"
        ))).thenReturn(List.of(studentStory, secondStudentStory, labStory, workshopStory, awardStory));

        var response = new PageContentController(repository).getFeaturedTestimonials();

        assertEquals(List.of("Student story", "Second student story", "Lab story", "Workshop story", "Award story"), response.data().stream()
            .map(PageContentResponse::sectionTitle)
            .toList());
    }

    @Test
    void workshopsAndAwardsAreAvailableInCommunityCollections() {
        PageContent workshop = content(4L, "testimonials-workshops", "Robotics workshop", null);
        PageContent award = content(5L, "testimonials-awards", "Student innovation award", null);
        when(repository.findAllByPageKeyInAndPublishedTrueOrderByDisplayOrderAsc(List.of(
            "testimonials",
            "testimonials-partner-schools",
            "testimonials-students",
            "testimonials-labs",
            "testimonials-community",
            "testimonials-workshops",
            "testimonials-awards",
            "testimonials-others"
        ))).thenReturn(List.of(workshop, award));

        var response = new PageContentController(repository).getPageContent("testimonials");

        assertEquals(List.of("Robotics workshop", "Student innovation award"), response.data().stream()
            .map(PageContentResponse::sectionTitle)
            .toList());
    }

    private PageContent content(Long id, String pageKey, String title, String imageUrl) {
        PageContent item = new PageContent();
        item.setId(id);
        item.setPageKey(pageKey);
        item.setSectionTitle(title);
        item.setSectionBody("Story text");
        item.setImageUrl(imageUrl);
        return item;
    }
}
