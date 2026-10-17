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
        when(repository.findAllByPageKeyAndPublishedTrueOrderByDisplayOrderAsc("testimonials-students"))
            .thenReturn(List.of(studentStory));

        var response = new PageContentController(repository).getPageContent("testimonials-students");

        assertEquals(List.of("Student story"), response.data().stream()
            .map(PageContentResponse::sectionTitle)
            .toList());
        verify(repository).findAllByPageKeyAndPublishedTrueOrderByDisplayOrderAsc("testimonials-students");
    }

    @Test
    void featuredStoriesIncludeOnlyEntriesWithImagesAcrossTestimonialSections() {
        PageContent studentStory = content(1L, "testimonials-students", "Student story", "https://example.com/student.jpg");
        PageContent textOnlyStory = content(2L, "testimonials-labs", "Lab story", " ");
        when(repository.findAllByPageKeyInAndPublishedTrueOrderByDisplayOrderAsc(List.of(
            "testimonials",
            "testimonials-partner-schools",
            "testimonials-students",
            "testimonials-labs",
            "testimonials-community",
            "testimonials-others"
        ))).thenReturn(List.of(studentStory, textOnlyStory));

        var response = new PageContentController(repository).getFeaturedTestimonials();

        assertEquals(List.of("Student story"), response.data().stream()
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
