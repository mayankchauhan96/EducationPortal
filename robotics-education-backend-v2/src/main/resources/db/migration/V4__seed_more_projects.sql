INSERT INTO projects (title, slug, description, difficulty, grade_range, skills, image_url, published)
VALUES
    ('Smart Home', 'smart-home', 'A connected home model that introduces automation, sensors, and smart device control.', 'Beginner', 'Grades 4-7', 'Automation • Sensors • IoT', 'https://qtlearncodelab.github.io/qtpi-shared/images/projects/SmartHome/smart-home-small.png', true),
    ('Basketball Counter', 'basketball-counter', 'A project that tracks scores and event counts using sensors and logic-based triggers.', 'Beginner', 'Grades 4-8', 'Logic • Counting • Electronics', 'https://qtlearncodelab.github.io/qtpi-shared/images/projects/BasketBallCounter/bbcounter-small.png', true),
    ('Smart Goggles', 'smart-goggles', 'An interactive smart eyewear concept that demonstrates how sensors can respond to changing conditions.', 'Intermediate', 'Grades 6-9', 'Sensors • Design • Coding', 'https://qtlearncodelab.github.io/qtpi-shared/images/projects/SmartGoggles/smart-goggle-small.png', true),
    ('Merry Go Round', 'merry-go-round', 'A rotating model that uses motion and mechanical design to explore motion control.', 'Intermediate', 'Grades 5-8', 'Mechanics • Motion • STEM', 'https://qtlearncodelab.github.io/qtpi-shared/images/projects/MerryGoRound/merrygoround-small.png', true),
    ('RC Car With Headlights', 'rc-car-with-headlights', 'A fun radio-controlled car project that adds lighting control and responsive design.', 'Intermediate', 'Grades 6-10', 'Electronics • Control • Design', 'https://qtlearncodelab.github.io/qtpi-shared/images/projects/RcCarHeadLights/rc-car-headlight-small.png', true),
    ('Smart Locker', 'smart-locker', 'A secure locker model that explores access control, sensors, and automation logic.', 'Intermediate', 'Grades 7-10', 'Security • Automation • Coding', 'https://qtlearncodelab.github.io/qtpi-shared/images/projects/SmartLocker/smart-locker-small.png', true),
    ('Parking Assistance', 'parking-assistance', 'A miniature parking system that teaches obstacle detection and guidance logic.', 'Intermediate', 'Grades 6-9', 'Sensors • Alarms • Problem Solving', 'https://qtlearncodelab.github.io/qtpi-shared/images/projects/ParkingAssistance/parking-assistance-small.png', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO program_projects (program_id, project_id)
SELECT p.id, pr.id
FROM programs p
JOIN projects pr ON (
    (p.title = 'Robotics' AND pr.title IN ('Obstacle Avoiding Robot', 'Robotic Arm', 'RC Car With Headlights', 'Merry Go Round')) OR
    (p.title = 'Coding' AND pr.title IN ('Smart Home', 'Basketball Counter', 'Smart Locker', 'Parking Assistance', 'Smart Goggles')) OR
    (p.title = 'Electronics' AND pr.title IN ('Smart Home', 'Basketball Counter', 'Smart Locker', 'Parking Assistance', 'RC Car With Headlights')) OR
    (p.title = 'AI & IoT' AND pr.title IN ('Smart Home', 'Smart Goggles', 'Smart Locker', 'Parking Assistance'))
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
