-- Restore a valid set of 7 project cards sourced from the QtPi project catalog.
-- These image URLs are real assets from the QtPi shared project gallery and render correctly.

INSERT INTO projects (title, slug, description, difficulty, grade_range, skills, image_url, published)
VALUES
    (
        'Smart Home',
        'smart-home',
        'A connected home model that introduces automation, sensors, and smart device control.',
        'Beginner',
        'Grades 4-7',
        'Automation • Sensors • IoT',
        'https://qtlearncodelab.github.io/qtpi-shared/images/projects/SmartHome/smart-home-small.png',
        true
    ),
    (
        'Basketball Counter',
        'basketball-counter',
        'A project that tracks scores and event counts using sensors and logic-based triggers.',
        'Beginner',
        'Grades 4-8',
        'Logic • Counting • Electronics',
        'https://qtlearncodelab.github.io/qtpi-shared/images/projects/BasketBallCounter/bbcounter-small.png',
        true
    ),
    (
        'Smart Goggles',
        'smart-goggles',
        'An interactive smart eyewear concept that demonstrates how sensors can respond to changing conditions.',
        'Intermediate',
        'Grades 6-9',
        'Sensors • Design • Coding',
        'https://qtlearncodelab.github.io/qtpi-shared/images/projects/SmartGoggles/smart-goggle-small.png',
        true
    ),
    (
        'Merry Go Round',
        'merry-go-round',
        'A rotating model that uses motion and mechanical design to explore motion control.',
        'Intermediate',
        'Grades 5-8',
        'Mechanics • Motion • STEM',
        'https://qtlearncodelab.github.io/qtpi-shared/images/projects/MerryGoRound/merrygoround-small.png',
        true
    ),
    (
        'RC Car With Headlights',
        'rc-car-with-headlights',
        'A fun radio-controlled car project that adds lighting control and responsive design.',
        'Intermediate',
        'Grades 6-10',
        'Electronics • Control • Design',
        'https://qtlearncodelab.github.io/qtpi-shared/images/projects/RcCarHeadLights/rc-car-headlight-small.png',
        true
    ),
    (
        'Smart Locker',
        'smart-locker',
        'A secure locker model that explores access control, sensors, and automation logic.',
        'Intermediate',
        'Grades 7-10',
        'Security • Automation • Coding',
        'https://qtlearncodelab.github.io/qtpi-shared/images/projects/SmartLocker/smart-locker-small.png',
        true
    ),
    (
        'Parking Assistance',
        'parking-assistance',
        'A miniature parking system that teaches obstacle detection and guidance logic.',
        'Intermediate',
        'Grades 6-9',
        'Sensors • Alarms • Problem Solving',
        'https://qtlearncodelab.github.io/qtpi-shared/images/projects/ParkingAssistance/parking-assistance-small.png',
        true
    )
ON CONFLICT (slug) DO NOTHING;
