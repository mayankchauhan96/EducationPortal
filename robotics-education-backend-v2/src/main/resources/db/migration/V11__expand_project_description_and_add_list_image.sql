ALTER TABLE projects
    ALTER COLUMN description TYPE TEXT,
    ALTER COLUMN image_url TYPE VARCHAR(1000),
    ALTER COLUMN video_url TYPE VARCHAR(1000),
    ADD COLUMN list_image_url VARCHAR(1000);

UPDATE projects
SET list_image_url = image_url
WHERE list_image_url IS NULL;
