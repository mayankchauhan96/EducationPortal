# Deployment Guide

This project has a React frontend and a Spring Boot backend with PostgreSQL. A production-ready setup is:

- Frontend: Vercel
- Backend: Render
- Database: Neon Postgres

This guide covers the required environment variables and deployment steps.

---

## 1) Architecture

- React SPA in `robotics-education-frontend`
- Spring Boot API in `robotics-education-backend-v2`
- PostgreSQL database hosted on Neon
- Frontend and backend are separate deployments

Recommended flow:

- Vercel hosts the React app
- Render hosts the Spring Boot API
- Neon provides the PostgreSQL database
- Backend uses environment variables for all secrets and runtime config
- Frontend uses a single `VITE_API_URL` variable for the backend API base URL

---

## 2) PostgreSQL database on Neon

Create a Neon project and database.

After creation, copy the database connection string from Neon.

Example format:

```bash
postgresql://user:password@host/dbname?sslmode=require
```

Use this value in Render as the backend `DATABASE_URL` environment variable.

Important:
- keep credentials in the hosting platform, not in source code
- never commit `.env` files to Git
- do not put real production secrets in `.env.example`

---

## 3) Backend deployment on Render

### Create a Web Service

1. Go to Render.
2. Click New > Web Service.
3. Connect your GitHub repository.
4. Choose the backend folder: `robotics-education-backend-v2`
5. Set the runtime to Node or Docker only if needed, but the project is a Java Spring Boot app.
6. Render should detect the Java app automatically or use your Dockerfile if configured.

### Required backend environment variables

Set these in the Render dashboard:

```bash
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
DATABASE_USERNAME=<neon-db-user>
DATABASE_PASSWORD=<neon-db-password>
FRONTEND_URL=https://your-frontend-domain.vercel.app
PORT=8080
JWT_SECRET=<generate-a-long-random-secret>
JWT_EXPIRATION_MS=86400000
```

Notes:
- `DATABASE_URL` should be the full Neon connection string.
- `FRONTEND_URL` should be your deployed Vercel frontend URL.
- `PORT` is required by Render and is usually injected automatically; keep `8080` as the fallback in the app config.
- `JWT_SECRET` must be a strong random string.

### Recommended backend runtime notes

- Keep the app listening on the Render-provided port via `${PORT:8080}` in Spring Boot config.
- Enable CORS for the deployed Vercel frontend using `FRONTEND_URL`.
- The backend should not hardcode localhost URLs in production.

---

## 4) Frontend deployment on Vercel

### Create a Vercel project

1. Go to Vercel.
2. Import the frontend repository or monorepo folder.
3. Set the project root to `robotics-education-frontend`.
4. Framework should be detected as Vite.

### Required frontend environment variables

In the Vercel project settings, add:

```bash
VITE_API_URL=https://your-backend-service.onrender.com/api
```

For local development, keep:

```bash
VITE_API_URL=http://localhost:8080/api
```

Do not hardcode the production backend URL in the source code. Use environment variables only.

---

## 5) Local development setup

### Backend local `.env`

Create a local `.env` file in `robotics-education-backend-v2` using the example values from `.env.example`:

```bash
DATABASE_URL=jdbc:postgresql://localhost:5432/robotics_education?options=-c%20TimeZone%3DUTC
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=change_me
PORT=8080
FRONTEND_URL=http://localhost:5173
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRATION_MS=86400000
```

### Frontend local `.env`

Create a local `.env` file in `robotics-education-frontend`:

```bash
VITE_API_URL=http://localhost:8080/api
```

Use `.env.example` files as templates only and never commit real secrets.

---

## 6) CORS configuration

The backend should allow:

- the Vercel frontend production URL via `FRONTEND_URL`
- the local frontend URL at `http://localhost:5173`

Example values:

```bash
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

This prevents hardcoded production frontend URLs while keeping localhost support for local development.

---

## 7) Deployment checklist

Before deploying:

- [ ] PostgreSQL database created on Neon
- [ ] Backend `DATABASE_URL` set in Render
- [ ] Backend JWT secret set in Render
- [ ] Backend `FRONTEND_URL` set to Vercel domain
- [ ] Frontend `VITE_API_URL` set to Render backend URL
- [ ] No `.env` files committed to Git
- [ ] `.env.example` templates kept in source control only
- [ ] Build passes locally
- [ ] Backend CORS allows both localhost and production frontend origin

---

## 8) Example production values

```bash
# Backend on Render
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
DATABASE_USERNAME=user
DATABASE_PASSWORD=password
FRONTEND_URL=https://robotics-education.vercel.app
PORT=8080
JWT_SECRET=super-long-random-secret
JWT_EXPIRATION_MS=86400000

# Frontend on Vercel
VITE_API_URL=https://robotics-education-backend.onrender.com/api
```

---

## 9) Security reminders

- never commit `.env` files
- never put real secrets in GitHub
- rotate secrets if they were ever exposed
- use Render and Vercel environment variables for all production secrets
- keep `.env.example` files free of real credentials
