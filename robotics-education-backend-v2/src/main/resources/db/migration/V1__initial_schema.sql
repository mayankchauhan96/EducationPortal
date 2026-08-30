CREATE TABLE programs (
 id BIGSERIAL PRIMARY KEY, title VARCHAR(120) NOT NULL, slug VARCHAR(140) NOT NULL UNIQUE,
 description VARCHAR(1000) NOT NULL, age_group VARCHAR(80), tag VARCHAR(120), image_url VARCHAR(255),
 published BOOLEAN NOT NULL DEFAULT TRUE, display_order INTEGER NOT NULL DEFAULT 0,
 created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE projects (
 id BIGSERIAL PRIMARY KEY, title VARCHAR(160) NOT NULL, slug VARCHAR(180) NOT NULL UNIQUE,
 description VARCHAR(1000) NOT NULL, difficulty VARCHAR(40), grade_range VARCHAR(80), skills VARCHAR(255),
 image_url VARCHAR(255), video_url VARCHAR(255), published BOOLEAN NOT NULL DEFAULT TRUE,
 created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE curriculum (
 id BIGSERIAL PRIMARY KEY, level_name VARCHAR(100) NOT NULL, grade_range VARCHAR(50) NOT NULL,
 learning_objectives VARCHAR(1000), skills VARCHAR(1000), image_url VARCHAR(255), published BOOLEAN NOT NULL DEFAULT TRUE,
 display_order INTEGER NOT NULL DEFAULT 0, created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE demo_requests (
 id BIGSERIAL PRIMARY KEY, contact_name VARCHAR(120) NOT NULL, school_name VARCHAR(160) NOT NULL,
 email VARCHAR(160) NOT NULL, phone VARCHAR(30), city VARCHAR(100), role VARCHAR(100), student_count VARCHAR(30),
 grades VARCHAR(100), message VARCHAR(1000), status VARCHAR(30) NOT NULL DEFAULT 'NEW',
 created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE contact_requests (
 id BIGSERIAL PRIMARY KEY, name VARCHAR(120) NOT NULL, email VARCHAR(160) NOT NULL, phone VARCHAR(30),
 school_name VARCHAR(160), message VARCHAR(1500) NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO programs(title,slug,description,age_group,tag,display_order) VALUES
('Robotics','robotics','Build, assemble and program robots while learning engineering fundamentals.','Grades 4-12','Build + Code',1),
('Coding','coding','Develop computational thinking through age-appropriate coding challenges.','Grades 1-12','Think + Create',2),
('Electronics','electronics','Understand sensors, circuits and how intelligent systems interact with the world.','Grades 5-12','Explore + Connect',3),
('AI & IoT','ai-iot','Introduce students to connected devices, automation and emerging technologies.','Grades 8-12','Imagine + Innovate',4);

INSERT INTO projects(title,slug,description,difficulty,grade_range,skills) VALUES
('Obstacle Avoiding Robot','obstacle-avoiding-robot','A sensor-driven robot that detects obstacles and changes direction automatically.','Beginner','Grades 4-7','Sensors • Logic • Robotics'),
('Smart Traffic System','smart-traffic-system','An automated traffic-light model that demonstrates electronics and automation.','Intermediate','Grades 6-9','Electronics • Automation'),
('Robotic Arm','robotic-arm','A programmable robotic arm project that introduces mechanics, control and coding.','Advanced','Grades 8-12','Mechanics • Control • Coding');

INSERT INTO curriculum(level_name,grade_range,learning_objectives,skills,display_order) VALUES
('Foundation Explorers','Grades 1-3','Explore sequencing, patterns, simple machines and creative problem solving.','Logic • Creativity • Collaboration',1),
('Young Makers','Grades 4-5','Build simple robots and circuits and learn basic block-based programming.','Robotics • Coding • Electronics',2),
('Future Engineers','Grades 6-8','Design, program and iterate on increasingly complex robotics projects.','Engineering • Sensors • Automation',3),
('Innovation Lab','Grades 9-10','Apply programming, electronics and robotics to real-world problems.','Python • Robotics • IoT',4),
('Advanced Innovators','Grades 11-12','Develop advanced prototypes and technology-focused capstone projects.','AI • IoT • Systems Thinking',5);
