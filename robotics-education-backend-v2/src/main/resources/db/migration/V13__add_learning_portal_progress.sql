CREATE TABLE schools (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(160) NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classrooms (
    id BIGSERIAL PRIMARY KEY,
    school_id BIGINT NOT NULL REFERENCES schools(id),
    curriculum_id BIGINT NOT NULL REFERENCES curriculum(id),
    name VARCHAR(120) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (school_id, name, academic_year)
);

CREATE TABLE classroom_memberships (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    classroom_id BIGINT NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, classroom_id)
);

CREATE TABLE principal_schools (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    school_id BIGINT NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, school_id)
);

CREATE TABLE parent_student_links (
    id BIGSERIAL PRIMARY KEY,
    parent_id BIGINT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    student_id BIGINT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (parent_id, student_id),
    CHECK (parent_id <> student_id)
);

CREATE TABLE curriculum_lessons (
    id BIGSERIAL PRIMARY KEY,
    curriculum_id BIGINT NOT NULL REFERENCES curriculum(id) ON DELETE CASCADE,
    title VARCHAR(160) NOT NULL,
    description VARCHAR(1000),
    display_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_lesson_progress (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    lesson_id BIGINT NOT NULL REFERENCES curriculum_lessons(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    notes VARCHAR(1000),
    updated_by VARCHAR(150) NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, lesson_id)
);

CREATE TABLE student_work_progress (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    work_type VARCHAR(20) NOT NULL,
    title VARCHAR(160) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    notes VARCHAR(1000),
    updated_by VARCHAR(150) NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (work_type IN ('PROJECT', 'ASSIGNMENT'))
);

CREATE INDEX idx_classrooms_school ON classrooms(school_id);
CREATE INDEX idx_classroom_memberships_classroom ON classroom_memberships(classroom_id);
CREATE INDEX idx_principal_schools_school ON principal_schools(school_id);
CREATE INDEX idx_parent_student_links_student ON parent_student_links(student_id);
CREATE INDEX idx_curriculum_lessons_curriculum ON curriculum_lessons(curriculum_id, display_order);
CREATE INDEX idx_student_lesson_progress_student ON student_lesson_progress(student_id);
CREATE INDEX idx_student_work_progress_student ON student_work_progress(student_id, updated_at);
