package com.robotics.education.pagecontent;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PageContentRepository extends JpaRepository<PageContent, Long> {
    List<PageContent> findAllByPageKeyAndPublishedTrueOrderByDisplayOrderAsc(String pageKey);
}
