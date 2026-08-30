INSERT INTO program_projects (program_id, project_id)
SELECT p.id, pr.id
FROM programs p
JOIN projects pr ON (
    (p.title = 'Robotics' AND pr.title IN ('Obstacle Avoiding Robot', 'Robotic Arm')) OR
    (p.title = 'Coding' AND pr.title = 'Smart Traffic System') OR
    (p.title = 'Electronics' AND pr.title IN ('Smart Traffic System', 'Robotic Arm')) OR
    (p.title = 'AI & IoT' AND pr.title IN ('Smart Traffic System', 'Obstacle Avoiding Robot'))
)
ON CONFLICT (program_id, project_id) DO NOTHING;

INSERT INTO curriculum_programs (curriculum_id, program_id)
SELECT c.id, p.id
FROM curriculum c
JOIN programs p ON (
    (c.level_name = 'Foundation Explorers' AND p.title = 'Coding') OR
    (c.level_name = 'Young Makers' AND p.title IN ('Coding', 'Robotics')) OR
    (c.level_name = 'Future Engineers' AND p.title IN ('Coding', 'Robotics', 'Electronics')) OR
    (c.level_name = 'Innovation Lab' AND p.title IN ('Electronics', 'AI & IoT')) OR
    (c.level_name = 'Advanced Innovators' AND p.title IN ('Electronics', 'AI & IoT'))
)
ON CONFLICT (curriculum_id, program_id) DO NOTHING;
