# Robotics Education Platform — GitHub Copilot Instructions

## Project Overview

We are building a modern Robotics & Technology Education platform for schools.

The company partners with schools to provide structured, project-based education in:

* Robotics
* Coding
* Electronics
* AI & IoT
* STEM
* Engineering
* Technology projects

The primary audience is:

1. School Principals / Management
2. Teachers / Coordinators
3. Parents
4. Students

The website must feel professional enough for school decision-makers while still being exciting and engaging for students and parents.

The design inspiration is modern educational/technology websites such as MotuBrain and AmazeHeads.

The visual direction is:

* Grey
* Black
* White
* Minimal
* Premium
* Modern
* Clean
* Technology-focused
* Strong typography
* Large whitespace
* Subtle animations
* Responsive on mobile, tablet and desktop

Brand colors, logo, images and other visual settings should remain configurable so they can be changed later.

---

# Technology Stack

## Frontend

* React JS
* React Router
* Axios
* Tailwind CSS
* Framer Motion

## Backend

* Java
* Spring Boot
* Spring Data JPA
* PostgreSQL
* Flyway
* REST APIs

## Architecture

The frontend is a Single Page Application.

The frontend must NOT hardcode business/content data when that data is available from the backend.

Preferred flow:

React Component
↓
API module
↓
Axios
↓
Spring Boot REST API
↓
Service
↓
Repository
↓
PostgreSQL

---

# IMPORTANT EXISTING FRONTEND STRUCTURE

Do not create duplicate components if an existing component already serves the purpose.

Current structure includes:

src/
├── api/
├── components/
│   ├── common/
│   └── home/
├── data/
├── pages/
├── layout/
└── App.jsx

Existing components include:

* components/home/Programs.jsx
* components/common/SectionHeader.jsx
* common navigation/footer components

Reuse existing components whenever possible.

Do NOT create:

* ProgramsSection.jsx
* ProgramsPage.jsx

if Programs.jsx already exists and can be reused.

---

# API Integration Rules

All backend calls should be placed inside:

src/api/

Example:

src/api/apiClient.js

The Axios client should use:

http://localhost:8080/api

Example:

src/api/programApi.js

```javascript
import apiClient from "./apiClient";

export const getPrograms = async () => {
  const response = await apiClient.get("/programs");
  return response.data.data;
};
```

Components should call API modules rather than directly calling Axios.

Do NOT put URLs directly inside components.

---

# Existing Programs Implementation

Programs are already successfully connected to the backend.

Backend endpoint:

GET /api/programs

Database currently contains:

* Robotics
* Coding
* Electronics
* AI & IoT

The existing:

components/home/Programs.jsx

fetches these records from the backend.

Use this implementation as the pattern for all other dynamic sections.

Do not break the existing Programs implementation.

---

# Dynamic Website Requirements

The following website sections/pages should eventually become dynamic.

## Programs

Backend:

GET /api/programs

Frontend:

components/home/Programs.jsx

Display:

* title
* description
* age group
* tag
* display order
* icon/image when supported

Future detail route:

/programs/:slug

---

## Projects

Projects should be loaded from the backend.

Expected frontend API module:

src/api/projectApi.js

Expected API:

GET /api/projects

Future:

GET /api/projects/:slug

Projects should support:

* title
* slug
* description
* category
* age group
* difficulty
* image
* featured flag
* display order

The UI should contain project cards and eventually project detail pages.

---

## Curriculum

Curriculum must be dynamic.

The curriculum should communicate a structured learning pathway based on age/grade.

Potential structure:

* Grade 1-3
* Grade 4-5
* Grade 6-8
* Grade 9-10
* Grade 11-12

The backend should be the source of truth.

Expected frontend:

src/api/curriculumApi.js

The UI should clearly communicate:

* grade
* learning level
* subjects/topics
* skills developed
* projects
* duration
* learning outcomes

Do not hardcode curriculum data in React.

---

# Schools Page

The Schools page is primarily targeted at:

* Principals
* School management
* Academic coordinators

It should explain the partnership model.

Possible sections:

1. Why schools partner with us
2. What we provide
3. Curriculum
4. Robotics kits/equipment
5. Teacher enablement
6. Student projects
7. Implementation model
8. School benefits
9. Request a school demo

Keep the content configurable through backend APIs where appropriate.

---

# Teachers Page

Target audience:

Teachers and STEM coordinators.

Explain:

* Teacher training
* Lesson plans
* Robotics kits
* Project guidance
* Curriculum support
* Student assessment
* Classroom implementation

Use dynamic content where appropriate.

---

# Parents Page

Target audience:

Parents.

Focus on:

* What students learn
* Why robotics matters
* Coding skills
* Problem solving
* Creativity
* Engineering mindset
* Future technology skills
* Project-based learning

Avoid overly technical language.

---

# About Page

Explain:

* Company mission
* Vision
* Education philosophy
* Project-based learning
* School collaboration
* Robotics/STEM focus

Content should eventually be manageable from backend configuration.

---

# Contact Page

Contact should support:

* Name
* Email
* Phone
* School/Organization
* Message

Form submission should call:

POST /api/contact

Do not simply log form data to console.

Display:

* loading state
* success state
* validation errors
* API errors

---

# Demo Request

There should be a strong CTA throughout the website:

"Book a School Demo"

The form should capture:

* Name
* Email
* Phone
* School name
* City
* Role
* Message

Submit to:

POST /api/demo-requests

---

# Navigation

The Navbar is GLOBAL.

It must NOT be inside Home.jsx.

Use a shared layout:

src/layout/MainLayout.jsx

Structure:

<MainLayout>
    <Navbar />
    <Outlet />
    <Footer />
</MainLayout>

React Router should use nested routes.

Example:

<Route element={<MainLayout />}>
<Route path="/" element={<Home />} />
<Route path="/programs" element={<Programs />} />
... </Route>

This ensures Navbar and Footer remain visible while navigating between pages.

Do not duplicate Navbar/Footer inside individual pages.

---

# Routes

The intended public routes are:

/
/programs
/programs/:slug
/curriculum
/projects
/projects/:slug
/schools
/teachers
/parents
/about
/contact

Future admin routes:

/admin/login
/admin
/admin/programs
/admin/projects
/admin/curriculum
/admin/schools
/admin/leads
/admin/testimonials
/admin/blogs
/admin/settings

---

# UI/UX Requirements

Every page must be:

* Responsive
* Mobile-first
* Accessible
* Fast
* Visually consistent

Use the existing design system.

Primary visual language:

* black
* white
* grey
* zinc shades

Avoid introducing random colors.

Use Framer Motion for subtle animations.

Animations should be:

* smooth
* professional
* subtle

Avoid excessive animations.

---

# Loading and Error States

Every API-driven component must handle:

1. Loading
2. Success
3. Empty state
4. Error

Example:

```jsx
if (loading) {
    return <LoadingState />;
}

if (error) {
    return <ErrorState />;
}

if (!items.length) {
    return <EmptyState />;
}
```

Do not leave users with a blank screen.

---

# Data Handling

Never assume an API field exists.

Before using a new field:

1. Check the backend response.
2. Check the Java DTO/record.
3. Check the database schema.
4. Then implement the frontend.

If a field does not exist, do not invent it silently.

Ask to extend the backend model or use an existing field.

---

# Backend Changes

When a required backend API does not exist:

Do not fake the API on the frontend.

Instead:

1. Identify the missing backend endpoint.
2. Add the appropriate Java record DTO.
3. Add/update entity.
4. Add repository method if required.
5. Add service.
6. Add controller endpoint.
7. Add Flyway migration if schema changes.
8. Test through Swagger.
9. Then connect React.

---

# Database

PostgreSQL is running through Docker.

Database:

robotics_education

Database timezone:

UTC

Do not change the PostgreSQL timezone to Asia/Calcutta.

Flyway manages database migrations.

Never modify an already-applied Flyway migration.

Create a new migration instead.

---

# Coding Style

Prefer:

* functional React components
* hooks
* async/await
* reusable API modules
* reusable UI components
* small components
* clear naming

Avoid:

* duplicated API calls
* duplicated UI
* hardcoded URLs
* hardcoded website content
* unnecessary global state
* unnecessary dependencies

---

# Before Making Changes

Always inspect the existing code first.

Do not create a new component when an existing component can be enhanced.

Do not replace working code unnecessarily.

Maintain the current visual design.

If changing a shared component, check all usages before modifying it.

---

# Development Strategy

Implement incrementally.

Recommended order:

1. Fix shared layout/navigation
2. Programs
3. Projects
4. Curriculum
5. Schools
6. Teachers
7. Parents
8. About
9. Contact
10. Demo Requests
11. Testimonials
12. Blog
13. Admin authentication
14. Admin dashboard
15. Admin CRUD
16. Production hardening

Always verify each feature before moving to the next.

---

# Current Status

Completed:

* React SPA foundation
* Spring Boot backend
* PostgreSQL Docker setup
* Flyway
* Swagger
* Programs database
* GET /api/programs
* React Programs component connected to backend

Currently working on:

* Shared Navbar/Footer layout
* Making remaining website pages dynamic

Do not break the existing Programs integration.

The goal is a production-quality Robotics Education platform rather than a static marketing website.


# Stage 2 Admin Architecture

The current integrated project includes a protected admin portal.

## Admin frontend routes

/admin/login
/admin
/admin/programs
/admin/projects
/admin/curriculum
/admin/page-content
/admin/contacts
/admin/demo-requests
/admin/users

Use sessionStorage for the development JWT token. Do not hardcode bearer tokens.

## Admin backend

POST /api/auth/login

Protected endpoints:
GET /api/admin/dashboard
GET/POST/PUT/DELETE /api/admin/programs
GET/POST/PUT/DELETE /api/admin/projects
GET/POST/PUT/DELETE /api/admin/curriculum
GET/POST/PUT/DELETE /api/admin/page-content
GET/PATCH /api/admin/contacts
GET/PATCH /api/admin/demo-requests
GET/POST/PATCH /api/admin/users (ADMIN only)

Roles:
ADMIN
EDITOR

ADMIN can manage users. ADMIN and EDITOR can manage content.

## Data model rules

Keep existing V1-V5 schema and relations intact.

Program ↔ Project is many-to-many through program_projects.
Curriculum ↔ Program is many-to-many through curriculum_programs.

Program, Project and Curriculum admin create/update requests can accept relationship IDs.

Do not create duplicate tables for existing contact/demo/page content models.

Use Java records for DTO/request/response types.
Use standard mutable Java classes for JPA entities.

## Admin security

JWT is stateless.
BCrypt is used for passwords.
JWT secret, admin email and admin password are environment-configurable.

Development defaults:
admin@robotics.local
Admin@12345

These must not be treated as production credentials.

## Timezone

PostgreSQL and Hibernate use UTC.
Do not use Asia/Calcutta.
Do not change database timezone to local time.

## Stage 2 UI

The admin portal is intentionally simple and functional. Preserve it while
improving visual polish. Do not create a second admin architecture.

## Current integration requirement

When changing public content models, update:
1. Flyway migration
2. JPA entity
3. repository/service/controller
4. public API DTO
5. frontend API module
6. public component/page
7. admin API/UI where applicable

After changes, run both:
mvn clean package
npm run build
