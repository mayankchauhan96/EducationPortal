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

`JWT_SECRET` must be Base64-encoded and decode to at least 32 bytes. For local
PowerShell development, generate a temporary secret and start the backend in the
same terminal session:

```powershell
$bytes = New-Object byte[] 32
$rng = [Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
mvn spring-boot:run
```

For local development, copy [.env.example](.env.example) to `.env` from the
backend directory, replace `JWT_SECRET` with your own randomly generated value,
and then run `mvn spring-boot:run` from that directory. Spring Boot loads this
optional `.env` file; environment variables set by your IDE or deployment take
precedence. Do not commit real secrets.
