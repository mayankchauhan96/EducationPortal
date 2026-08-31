# Robotics Education Backend v2

Java 17 + Spring Boot + PostgreSQL.

Lombok has been completely removed.

Java records are intentionally used for immutable API DTOs:
- ApiResponse
- ProgramResponse
- ProjectResponse
- CurriculumResponse
- ContactCreateRequest
- DemoRequestCreateRequest

JPA entities remain normal Java classes because records are not a good fit for
JPA/Hibernate entity lifecycle/proxy requirements.

## Run

docker compose up -d
mvn spring-boot:run

Or use an existing local PostgreSQL database named `robotics_education`.

Swagger:
http://localhost:8080/swagger-ui.html

Health:
http://localhost:8080/actuator/health

## APIs

GET  /api/programs
GET  /api/programs/{slug}
GET  /api/projects
GET  /api/projects/{slug}
GET  /api/curriculum
POST /api/contact
POST /api/demo-requests

Environment variables:
- DATABASE_URL
- DATABASE_USERNAME
- DATABASE_PASSWORD
- FRONTEND_URL
- PORT
- JWT_SECRET
- JWT_EXPIRATION_MS

Copy [.env.example](.env.example) to `.env` locally and set your own values. Do not commit real secrets.
