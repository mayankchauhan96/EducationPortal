# Robotics Education Backend — Integrated Stage 2

This backend is integrated with the current EducationPortal source.

## Stack

- Java 17
- Spring Boot 3.4.x
- Spring Security
- JWT
- BCrypt
- Spring Data JPA
- PostgreSQL
- Flyway
- Swagger / OpenAPI

## Run

Make sure Docker Desktop is running.

```powershell
docker compose up -d
mvn clean spring-boot:run
```

Backend:
http://localhost:8080

Swagger:
http://localhost:8080/swagger-ui.html

Health:
http://localhost:8080/actuator/health

## Development admin

The application creates a local development admin account automatically when
the configured email does not exist.

Default:

Email: `admin@robotics.local`
Password: `Admin@12345`

Override with:

- ADMIN_EMAIL
- ADMIN_PASSWORD
- JWT_SECRET

Do not use the development defaults in production.

## Public APIs

- GET `/api/programs`
- GET `/api/programs/{slug}`
- GET `/api/projects`
- GET `/api/projects/{slug}`
- GET `/api/curriculum`
- GET `/api/curriculum/{slug}`
- GET `/api/pages/{pageKey}`
- POST `/api/contact`
- POST `/api/demo-requests`

## Admin APIs

- POST `/api/auth/login`
- GET `/api/admin/dashboard`

Programs:
- GET `/api/admin/programs`
- POST `/api/admin/programs`
- PUT `/api/admin/programs/{id}`
- DELETE `/api/admin/programs/{id}`

Projects:
- GET `/api/admin/projects`
- POST `/api/admin/projects`
- PUT `/api/admin/projects/{id}`
- DELETE `/api/admin/projects/{id}`

Curriculum:
- GET `/api/admin/curriculum`
- POST `/api/admin/curriculum`
- PUT `/api/admin/curriculum/{id}`
- DELETE `/api/admin/curriculum/{id}`

Page content:
- GET `/api/admin/page-content`
- POST `/api/admin/page-content`
- PUT `/api/admin/page-content/{id}`
- DELETE `/api/admin/page-content/{id}`

Leads:
- GET/PATCH `/api/admin/contacts`
- GET/PATCH `/api/admin/demo-requests`

Users:
- GET/POST/PATCH `/api/admin/users` (ADMIN only)

## Data relationships

- Program ↔ Project: many-to-many
- Curriculum ↔ Program: many-to-many

Admin request DTOs accept relationship IDs:
- `projectIds`
- `programIds`

## Database migrations

V1 through V5 are preserved from the current code base.

V6 adds:
- `admin_users`
- `projects.display_order`
- `contact_requests.status`
- supporting indexes

Never modify an already-applied Flyway migration. Use V7+ for future changes.

## Timezone

PostgreSQL, JDBC and Hibernate use UTC.

Do not use `Asia/Calcutta`.
