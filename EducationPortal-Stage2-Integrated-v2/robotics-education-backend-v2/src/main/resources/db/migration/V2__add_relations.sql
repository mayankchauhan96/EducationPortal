CREATE TABLE program_projects (
    program_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    PRIMARY KEY (program_id, project_id),
    CONSTRAINT fk_program_projects_program FOREIGN KEY (program_id) REFERENCES programs(id),
    CONSTRAINT fk_program_projects_project FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE curriculum_programs (
    curriculum_id BIGINT NOT NULL,
    program_id BIGINT NOT NULL,
    PRIMARY KEY (curriculum_id, program_id),
    CONSTRAINT fk_curriculum_programs_curriculum FOREIGN KEY (curriculum_id) REFERENCES curriculum(id),
    CONSTRAINT fk_curriculum_programs_program FOREIGN KEY (program_id) REFERENCES programs(id)
);

ALTER TABLE curriculum ADD COLUMN slug VARCHAR(100);
UPDATE curriculum SET slug = LOWER(REPLACE(level_name, ' ', '-')) WHERE slug IS NULL;
ALTER TABLE curriculum ALTER COLUMN slug SET NOT NULL;
ALTER TABLE curriculum ADD CONSTRAINT uk_curriculum_slug UNIQUE (slug);

INSERT INTO program_projects (program_id, project_id)
SELECT p.id, pr.id
FROM programs p
JOIN projects pr ON (
    (p.title = 'Robotics' AND pr.title = 'Obstacle Avoiding Robot') OR
    (p.title = 'Coding' AND pr.title = 'Smart Traffic System') OR
    (p.title = 'Electronics' AND pr.title = 'Robotic Arm') OR
    (p.title = 'AI & IoT' AND pr.title = 'Obstacle Avoiding Robot')
);

INSERT INTO curriculum_programs (curriculum_id, program_id)
SELECT c.id, p.id
FROM curriculum c
JOIN programs p ON (
    (c.level_name = 'Foundation Explorers' AND p.title = 'Coding') OR
    (c.level_name = 'Young Makers' AND p.title = 'Robotics') OR
    (c.level_name = 'Future Engineers' AND p.title = 'Electronics') OR
    (c.level_name = 'Innovation Lab' AND p.title = 'AI & IoT') OR
    (c.level_name = 'Advanced Innovators' AND p.title = 'AI & IoT')
);
