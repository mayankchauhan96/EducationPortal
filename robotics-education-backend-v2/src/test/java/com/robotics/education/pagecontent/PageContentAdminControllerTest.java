package com.robotics.education.pagecontent;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PageContentAdminControllerTest {
    @Mock
    private PageContentRepository repository;

    @Test
    void adminListIncludesPublishedStatusForEditingStories() {
        PageContent publishedStory = content(1L, "testimonials-students", "Published story", true);
        PageContent draftStory = content(2L, "testimonials-students", "Draft story", false);
        when(repository.findAll()).thenReturn(List.of(publishedStory, draftStory));

        var response = new PageContentAdminController(repository).list();

        assertEquals(List.of(true, false), response.data().stream()
            .map(PageContentAdminResponse::published)
            .toList());
    }

    private PageContent content(Long id, String pageKey, String title, boolean published) {
        PageContent item = new PageContent();
        item.setId(id);
        item.setPageKey(pageKey);
        item.setSectionTitle(title);
        item.setSectionBody("Story text");
        item.setPublished(published);
        return item;
    }
}
