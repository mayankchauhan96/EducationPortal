ALTER TABLE page_content
    ADD COLUMN category VARCHAR(40),
    ADD COLUMN image_url VARCHAR(1000),
    ADD COLUMN image_alt_text VARCHAR(250),
    ADD COLUMN attribution VARCHAR(160);
