INSERT INTO curriculum_programs (curriculum_id, program_id)
SELECT c.id, p.id
FROM curriculum c
JOIN programs p ON (
    (c.level_name = 'Innovation Lab' AND p.title IN ('Coding', 'Robotics', 'Electronics', 'AI & IoT')) OR
    (c.level_name = 'Advanced Innovators' AND p.title IN ('Coding', 'Robotics', 'Electronics', 'AI & IoT'))
)
ON CONFLICT (curriculum_id, program_id) DO NOTHING;
