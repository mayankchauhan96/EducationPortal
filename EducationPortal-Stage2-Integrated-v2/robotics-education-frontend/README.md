# Robotics Education Frontend

React/Vite single-page application for the EducationPortal.

## Stack

- React
- React Router
- Axios
- Tailwind CSS
- Framer Motion
- React Hook Form

## Run

```powershell
npm install
npm run dev
```

Frontend:
http://localhost:5173

Backend:
http://localhost:8080

Copy `.env.example` to `.env` when needed.

## Public routes

- `/`
- `/programs`
- `/programs/:slug`
- `/projects`
- `/projects/:slug`
- `/curriculum`
- `/curriculum/:slug`
- `/schools`
- `/teachers`
- `/parents`
- `/students`
- `/about`
- `/blogs`
- `/testimonials`
- `/contact`
- `/demo-request`

## Admin routes

- `/admin/login`
- `/admin`
- `/admin/programs`
- `/admin/projects`
- `/admin/curriculum`
- `/admin/page-content`
- `/admin/contacts`
- `/admin/demo-requests`
- `/admin/users`

The global Navbar and Footer are owned by `MainLayout`, so they stay visible
across public SPA routes.
