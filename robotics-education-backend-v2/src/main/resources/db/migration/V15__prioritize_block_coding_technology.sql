UPDATE technologies
SET display_order = CASE
    WHEN slug = 'block-based-coding-robotics' THEN 1
    ELSE display_order + 1
END;
