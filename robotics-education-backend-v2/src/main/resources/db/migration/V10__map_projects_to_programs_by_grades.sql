DELETE FROM program_projects;

WITH program_grade_bounds AS (
    SELECT p.id,
           MIN((grade_match.value)[1]::INTEGER) AS min_grade,
           MAX((grade_match.value)[1]::INTEGER) AS max_grade
    FROM programs p
    CROSS JOIN LATERAL regexp_matches(COALESCE(p.age_group, ''), '[0-9]+', 'g') AS grade_match(value)
    GROUP BY p.id
),
project_grade_bounds AS (
    SELECT p.id,
           MIN((grade_match.value)[1]::INTEGER) AS min_grade,
           MAX((grade_match.value)[1]::INTEGER) AS max_grade
    FROM projects p
    CROSS JOIN LATERAL regexp_matches(COALESCE(p.grade_range, ''), '[0-9]+', 'g') AS grade_match(value)
    GROUP BY p.id
)
INSERT INTO program_projects (program_id, project_id)
SELECT program_grades.id, project_grades.id
FROM program_grade_bounds program_grades
JOIN project_grade_bounds project_grades
  ON program_grades.min_grade <= project_grades.max_grade
 AND project_grades.min_grade <= program_grades.max_grade;
