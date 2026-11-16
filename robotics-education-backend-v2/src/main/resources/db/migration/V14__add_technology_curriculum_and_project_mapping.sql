CREATE TABLE technologies (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(180) NOT NULL UNIQUE,
    title VARCHAR(180) NOT NULL,
    icon VARCHAR(40),
    description TEXT NOT NULL,
    overview TEXT NOT NULL,
    topics TEXT NOT NULL,
    resource_label VARCHAR(120) NOT NULL,
    resource_url VARCHAR(1000) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE project_technologies (
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    technology_id BIGINT NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, technology_id)
);

ALTER TABLE projects
    ADD COLUMN primary_technology_id BIGINT REFERENCES technologies(id) ON DELETE SET NULL;

INSERT INTO technologies
    (slug, title, icon, description, overview, topics, resource_label, resource_url, display_order, published)
VALUES
    ('artificial-intelligence-generative-ai', 'Artificial Intelligence & Generative AI', '✦',
     'Explore how computers recognize patterns, understand information, and help people create.',
     'Artificial intelligence helps computers find patterns and respond to information. Students explore how AI tools work, where they are useful, and how to use them thoughtfully.',
     'AI foundations|Prompt design|Responsible AI|Pattern recognition', 'Explore AI Lab', 'https://teachablemachine.withgoogle.com/', 1, TRUE),
    ('python-machine-learning', 'Python & Machine Learning', '</>',
     'Build confidence with Python and discover how code can learn from examples.',
     'Python gives students a clear way to express ideas as code. They progress from core programming concepts to understanding how a machine-learning model can learn from examples.',
     'Python basics|Data and variables|Algorithms|Machine-learning ideas', 'Launch Python', 'https://www.python.org/about/gettingstarted/', 2, TRUE),
    ('astronomy-space-science-satellites', 'Astronomy, Space Science & Satellites', '◉',
     'Investigate the solar system, satellites, and the technology used to explore space.',
     'Students look beyond Earth to understand how scientists study space and how satellites collect information that helps us observe our planet and the universe.',
     'Solar system|Orbits|Satellite systems|Earth observation', 'Explore Space Science', 'https://spaceplace.nasa.gov/', 3, TRUE),
    ('quantum-computing', 'Quantum Computing', '⌘',
     'Meet a new way of computing through accessible ideas, patterns, and puzzles.',
     'Quantum computing uses ideas from quantum physics to process information in new ways. Students build an age-appropriate foundation through visual explanations and guided activities.',
     'Bits and qubits|Superposition|Quantum puzzles|Future applications', 'Explore Quantum Learning', 'https://quantum.ibm.com/learning', 4, TRUE),
    ('cybersecurity', 'Cybersecurity', '⌑',
     'Learn how to protect information, devices, and connected systems.',
     'Cybersecurity is the practice of keeping devices, information, and people safer online. Students learn to recognize risks and understand the habits that help protect digital systems.',
     'Digital safety|Passwords and access|Threat awareness|Secure systems', 'Explore Cyber Learning', 'https://www.cyber.org/', 5, TRUE),
    ('iot-smart-systems', 'IoT & Smart Systems', '⌁',
     'Connect sensors, devices, and code to create systems that respond to the world.',
     'The Internet of Things connects physical devices so they can gather information and respond. Students explore how sensors, simple logic, and connected components create useful smart systems.',
     'Sensors and inputs|Connected devices|Automation|System design', 'Explore Arduino Projects', 'https://docs.arduino.cc/learn/', 6, TRUE),
    ('ar-vr-3d-design', 'AR/VR & 3D Design', '◇',
     'Turn ideas into 3D designs and explore how digital worlds are created.',
     '3D design helps students shape ideas into digital objects and environments. These foundations connect to augmented and virtual reality, where digital content can be experienced in new ways.',
     '3D modeling|Spatial thinking|Digital environments|Design iteration', 'Open the 3D Design Lab', 'https://www.tinkercad.com/', 7, TRUE),
    ('drone-technology', 'Drone Technology', '✣',
     'Understand how flight, sensors, control, and safety come together in drones.',
     'Drones combine flight, electronics, sensors, and control systems. Students explore how these components work together and how responsible operation keeps people and places safe.',
     'Flight and forces|Sensors|Remote control|Safe operation', 'Explore Drone Education', 'https://www.faa.gov/uas/educational_users', 8, TRUE),
    ('block-based-coding-robotics', 'Block-Based Coding & Robotics', '▦',
     'Build logic with visual code and bring ideas to life through robotics.',
     'Block-based coding lets students create programs by connecting visual instructions. Combined with robotics, it introduces sequencing, logic, sensors, and iterative problem-solving through hands-on builds.',
     'Sequences and loops|Events and logic|Robotics control|Sensors and debugging', 'Explore Scratch', 'https://scratch.mit.edu/ideas', 9, TRUE);

INSERT INTO project_technologies (project_id, technology_id)
SELECT project.id, technology.id
FROM (VALUES
    ('obstacle-avoiding-robot', 'block-based-coding-robotics'),
    ('obstacle-avoiding-robot', 'iot-smart-systems'),
    ('smart-traffic-system', 'block-based-coding-robotics'),
    ('smart-traffic-system', 'iot-smart-systems'),
    ('robotic-arm', 'block-based-coding-robotics'),
    ('robotic-arm', 'python-machine-learning'),
    ('smart-home', 'iot-smart-systems'),
    ('smart-goggles', 'ar-vr-3d-design'),
    ('smart-goggles', 'iot-smart-systems'),
    ('smart-locker', 'cybersecurity'),
    ('smart-locker', 'iot-smart-systems'),
    ('parking-assistance', 'iot-smart-systems'),
    ('rc-car-with-headlights', 'block-based-coding-robotics'),
    ('merry-go-round', 'block-based-coding-robotics'),
    ('basketball-counter', 'block-based-coding-robotics')
) AS mapping(project_slug, technology_slug)
JOIN projects project ON project.slug = mapping.project_slug
JOIN technologies technology ON technology.slug = mapping.technology_slug
ON CONFLICT DO NOTHING;

UPDATE projects project
SET primary_technology_id = technology.id
FROM (VALUES
    ('obstacle-avoiding-robot', 'block-based-coding-robotics'),
    ('smart-traffic-system', 'block-based-coding-robotics'),
    ('robotic-arm', 'block-based-coding-robotics'),
    ('smart-home', 'iot-smart-systems'),
    ('smart-goggles', 'ar-vr-3d-design'),
    ('smart-locker', 'cybersecurity'),
    ('parking-assistance', 'iot-smart-systems'),
    ('rc-car-with-headlights', 'block-based-coding-robotics'),
    ('merry-go-round', 'block-based-coding-robotics'),
    ('basketball-counter', 'block-based-coding-robotics')
) AS mapping(project_slug, technology_slug)
JOIN technologies technology ON technology.slug = mapping.technology_slug
WHERE project.slug = mapping.project_slug;
