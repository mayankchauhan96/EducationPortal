# Robotics Education Backend — Stage 2

Integrated into the current EducationPortal code base.

## Public APIs

GET  /api/programs
GET  /api/programs/{slug}
GET  /api/projects
GET  /api/projects/{slug}
GET  /api/curriculum
GET  /api/curriculum/{slug}
GET  /api/pages/{pageKey}
POST /api/contact
POST /api/demo-requests

## Admin APIs

POST /api/auth/login

GET  /api/admin/dashboard

GET/POST/PUT/DELETE /api/admin/programs
GET/POST/PUT/DELETE /api/admin/projects
GET/POST/PUT/DELETE /api/admin/curriculum
GET/POST/PUT/DELETE /api/admin/page-content

GET/PATCH /api/admin/contacts
GET/PATCH /api/admin/demo-requests

GET/POST/PATCH /api/admin/users   (ADMIN only)

## Admin UI

Frontend routes:
- /admin/login
- /admin
- /admin/programs
- /admin/projects
- /admin/curriculum
- /admin/page-content
- /admin/contacts
- /admin/demo-requests
- /admin/users

## Local development admin

Email: admin@robotics.local
Password: Admin@12345

These are development defaults. Set ADMIN_EMAIL, ADMIN_PASSWORD and JWT_SECRET before production.

## Run

Backend:
docker compose up -d
mvn clean spring-boot:run

Frontend:
npm install
npm run dev

Frontend:
http://localhost:5173

Admin:
http://localhost:5173/admin/login

Swagger:
http://localhost:8080/swagger-ui.html

## Migration

V1-V5 are preserved.
V6 creates admin_users, adds project display_order and contact request status, and adds indexes.

Do not edit an already-applied Flyway migration. Use V7+ for future schema changes.

## Security

JWT is stateless.
BCrypt is used for passwords.
ADMIN and EDITOR can manage content.
Only ADMIN can manage admin users.
