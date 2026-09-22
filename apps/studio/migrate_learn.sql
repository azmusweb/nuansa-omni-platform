CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    cover_image TEXT,
    price INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lessons (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_preview INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollments (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL,
    student_email TEXT NOT NULL,
    access_token TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
);
