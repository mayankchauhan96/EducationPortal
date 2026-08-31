CREATE TABLE page_content (
    id BIGSERIAL PRIMARY KEY,
    page_key VARCHAR(80) NOT NULL,
    section_title VARCHAR(160) NOT NULL,
    section_body VARCHAR(1500) NOT NULL,
    bullets VARCHAR(1500),
    display_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO page_content (page_key, section_title, section_body, bullets, display_order, published) VALUES
('schools', 'Why schools partner with us', 'We help schools deliver practical, confidence-building STEM education with clear pathways, teacher support, and measurable outcomes.', 'Curriculum design|Teacher enablement|Project-based learning|School-ready implementation', 1, true),
('schools', 'What we provide', 'From robotics kits to learning frameworks, we support schools at every stage of rollout and classroom adoption.', 'Robotics kits and equipment|Professional learning sessions|Curriculum guidance|Student project support', 2, true),
('teachers', 'Teacher support', 'We give educators the tools, confidence, and classroom strategies they need to deliver engaging STEM learning.', 'Lesson planning support|Student coaching|Classroom implementation guidance|Assessment ideas', 1, true),
('teachers', 'Classroom-ready learning', 'Our teacher pathway blends practical guidance with hands-on project experiences to keep learning active and relevant.', 'Structured projects|Skill-building activities|Progressive challenges|Real-world problem solving', 2, true),
('parents', 'Why robotics matters', 'Robotics helps students build confidence, persistence, and problem-solving skills in a way that feels exciting and relevant.', 'Critical thinking|Creativity|Teamwork|Future-ready skills', 1, true),
('parents', 'What students gain', 'Students learn how to turn ideas into working solutions while building coding, engineering, and creative confidence.', 'Coding fundamentals|Hands-on experimentation|Confidence with technology|Project-based learning', 2, true),
('students', 'What you will do', 'Students work on creative, hands-on challenges that turn ideas into real projects and solutions.', 'Build and test projects|Learn by doing|Solve real problems|Create with confidence', 1, true),
('students', 'Your learning journey', 'Each stage encourages curiosity, iteration, and collaboration as students grow from beginners to confident makers.', 'Try and experiment|Code and create|Test and improve|Present and reflect', 2, true),
('about', 'Our mission', 'We help students discover how technology can be used to solve meaningful problems through hands-on, project-based learning.', 'STEM education|School partnerships|Practical learning|Future-focused skills', 1, true),
('about', 'Our philosophy', 'We believe learning becomes more powerful when students build, test, and improve ideas in collaborative settings.', 'Project-based experiences|Curiosity-driven exploration|Visible learning outcomes|Confidence building', 2, true),
('blogs', 'Learning ideas', 'Explore practical classroom stories, project inspiration, and educational insights designed for schools and families.', 'STEM classroom ideas|Robotics inspiration|Student project stories|Teaching strategies', 1, true),
('testimonials', 'Family and educator feedback', 'Families and educators tell us the difference is visible in student confidence, curiosity, and engagement.', 'Students feel more confident|Teachers feel supported|Projects become memorable|Learning feels relevant', 1, true),
('schools', 'School benefits', 'Schools gain a clear innovation partner that supports both curriculum alignment and student engagement.', 'Improved STEM exposure|Teacher confidence|Sustainable implementation|Strong engagement', 3, true);
