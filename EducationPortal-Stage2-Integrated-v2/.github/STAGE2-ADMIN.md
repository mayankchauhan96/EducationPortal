# Stage 2 Admin

## Local URLs

- Public site: http://localhost:5173
- Admin login: http://localhost:5173/admin/login
- Backend Swagger: http://localhost:8080/swagger-ui.html

## Development admin

Default credentials:

- Email: admin@robotics.local
- Password: Admin@12345

These are development defaults only. Set ADMIN_EMAIL, ADMIN_PASSWORD and JWT_SECRET
environment variables before any deployment.

## Admin capabilities

- Dashboard counts
- Programs CRUD
- Projects CRUD
- Curriculum CRUD
- Page content CRUD
- Contact request inbox
- Demo request inbox/status
- Admin/editor user management

## Public content flow

Public pages consume public GET APIs. Admin changes are persisted to PostgreSQL
and become visible to the public site on the next API fetch/page refresh.

## Relationships

- Program can link to many projects
- Project can link to many programs
- Curriculum stage can link to many programs

Admin create/update APIs accept IDs in `projectIds` / `programIds`.

## Database

Flyway migration `V6__admin_security_and_management.sql` adds Stage 2 tables/columns.
Never edit already-applied migrations; add a new versioned migration for future changes.
