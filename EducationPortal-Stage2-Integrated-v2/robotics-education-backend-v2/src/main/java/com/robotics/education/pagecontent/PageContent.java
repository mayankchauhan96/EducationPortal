package com.robotics.education.pagecontent;

import com.robotics.education.common.AuditableEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "page_content")
public class PageContent extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "page_key", nullable = false, length = 80)
    private String pageKey;

    @Column(name = "section_title", nullable = false, length = 160)
    private String sectionTitle;

    @Column(name = "section_body", nullable = false, length = 1500)
    private String sectionBody;

    @Column(length = 1500)
    private String bullets;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @Column(nullable = false)
    private boolean published = true;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPageKey() { return pageKey; }
    public void setPageKey(String pageKey) { this.pageKey = pageKey; }

    public String getSectionTitle() { return sectionTitle; }
    public void setSectionTitle(String sectionTitle) { this.sectionTitle = sectionTitle; }

    public String getSectionBody() { return sectionBody; }
    public void setSectionBody(String sectionBody) { this.sectionBody = sectionBody; }

    public String getBullets() { return bullets; }
    public void setBullets(String bullets) { this.bullets = bullets; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public boolean isPublished() { return published; }
    public void setPublished(boolean published) { this.published = published; }
}
