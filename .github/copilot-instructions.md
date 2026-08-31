# EducationPortal — Copilot Project Context & Engineering Rules

## 1. Project Purpose

This repository is a Robotics, Coding, AI, IoT and STEM education platform designed for schools.

The platform serves:

* School principals and management
* Teachers
* Parents
* Students
* Internal administrators/content managers

The product has two major areas:

1. Public education website
2. Secure Admin/CMS portal

The public website must remain responsive, modern, educational and premium.

The visual direction is currently:

* Black
* White
* Grey
* Zinc shades
* Minimal
* Modern
* Technology/space inspired

Brand name, logo, colors and content must remain configurable.

---

# 2. Technology

## Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS
* Framer Motion

## Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Security
* Spring Data JPA
* PostgreSQL
* Flyway
* JWT
* Bean Validation
* Swagger/OpenAPI

---

# 3. Architecture

Use a modular monolith.

Do NOT introduce microservices.

General flow:

React
↓
API modules
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

For protected APIs:

React
↓
JWT
↓
Spring Security
↓
Controller
↓
Service
↓
Repository
↓
PostgreSQL

---

# 4. SOURCE-OF-TRUTH RULE

The CURRENT repository is the source of truth.

A separate integrated Stage 2 reference folder may be available locally.

Example:

reference/
EducationPortal-Stage2-Integrated-v2/

The reference implementation is ONLY a guide for:

* Authentication logic
* JWT handling
* Admin API patterns
* Admin dashboard
* CRUD structure
* Page-content management
* Lead management
* User management
* Authorization
* DTO patterns
* Security configuration
* Migration patterns

DO NOT blindly overwrite the current repository with the reference implementation.

Before changing anything:

1. Inspect the current repository.
2. Understand the current implementation.
3. Identify already-working functionality.
4. Identify differences between current code and reference implementation.
5. Reuse the current implementation wherever it already works.
6. Port only the required missing logic.
7. Preserve existing APIs, database schema and routes unless a change is genuinely required.

---

# 5. GOLDEN RULE

NEVER BREAK EXISTING FUNCTIONALITY.

Existing public functionality has already been developed and tested.

Working functionality includes:

* Home page
* Programs
* Projects
* Curriculum
* Dynamic content
* Public REST APIs
* PostgreSQL
* Flyway
* Swagger
* React routing
* Navbar/Footer
* Existing project/media functionality

Before changing any existing component:

* Search for every usage.
* Understand the dependencies.
* Make the smallest safe change.
* Verify that existing routes still work.

---

# 6. DO NOT DUPLICATE COMPONENTS

Before creating a component:

SEARCH THE REPOSITORY.

If something similar already exists, extend or reuse it.

Do NOT create duplicates such as:

Programs.jsx
ProgramsSection.jsx
ProgramsPage.jsx

when an existing Programs component already serves the purpose.

Prefer:

Existing component
↓
Enhance it
↓
Reuse it

---

# 7. CURRENT PUBLIC WEBSITE

Public routes include:

/
/programs
/programs/:slug
/projects
/projects/:slug
/curriculum
/schools
/teachers
/parents
/about
/contact

The Navbar and Footer are GLOBAL.

They must be rendered through a shared layout.

Preferred architecture:

MainLayout
├── Navbar
├── Outlet
└── Footer

Do NOT put Navbar/Footer directly inside individual pages.

---

# 8. CURRENT PUBLIC API PRINCIPLE

Public content is backend-driven.

The frontend should NOT maintain a second hardcoded source of truth for content that already exists in PostgreSQL.

Example:

Correct:

React
↓
GET /api/programs
↓
PostgreSQL

Incorrect:

React
↓
hardcoded programs array

The same principle applies to:

* Programs
* Projects
* Curriculum
* Page content
* Testimonials
* Blog content
* School information where applicable

---

# 9. API LAYER

All frontend API calls belong under:

src/api/

Examples:

src/api/apiClient.js
src/api/programApi.js
src/api/projectApi.js
src/api/curriculumApi.js
src/api/pageApi.js
src/api/contactApi.js
src/api/demoRequestApi.js
src/api/adminApi.js
src/api/authApi.js

Components must NOT contain raw Axios URLs.

Prefer:

component
↓
api module
↓
apiClient
↓
backend

---

# 10. DTO RULE

Use Java records for:

* Request DTOs
* Response DTOs
* API wrapper objects

Example:

public record ProgramResponse(
Long id,
String title,
String slug,
String description
) {}

Do NOT use records for JPA entities.

JPA entities should remain normal classes with:

* fields
* getters/setters
* JPA annotations
* constructors required by JPA

---

# 11. NO LOMBOK

Do NOT introduce Lombok.

Use standard Java.

This project intentionally avoids Lombok to eliminate annotation-processing issues.

---

# 12. DATABASE RULES

PostgreSQL is the persistent database.

Database:

robotics_education

Timezone:

UTC

Do NOT configure PostgreSQL as:

Asia/Calcutta

Do NOT reintroduce the previous timezone problem.

Application/JPA should use UTC.

---

# 13. FLYWAY RULES

Flyway manages database evolution.

NEVER modify an already-applied migration.

If the current project contains:

V1
V2
V3
V4
V5

do NOT edit those migrations.

Create:

V6
V7
V8

as required.

Migration naming:

V6__admin_security.sql

V7__page_content.sql

etc.

Before creating a migration:

* inspect existing schema
* inspect existing migrations
* verify whether a table/column already exists
* avoid duplicate table creation

---

# 14. ADMIN PORTAL OBJECTIVE

The Admin portal should allow authorized users to manage the public website.

Main navigation:

Dashboard
Programs
Projects
Curriculum
Schools
Testimonials
Blogs
Page Content
Media
Leads
Demo Requests
Users
Settings

---

# 15. ADMIN ROLES

Use role-based authorization.

Roles:

ADMIN
EDITOR

ADMIN:

* Full access
* Manage users
* Manage content
* Manage leads
* Manage settings

EDITOR:

* Manage website content
* Manage programs
* Manage projects
* Manage curriculum
* Manage page content
* View/manage leads as permitted

User-management APIs must be restricted to ADMIN.

NEVER rely only on hiding frontend routes.

Authorization must be enforced by Spring Security on the backend.

---

# 16. AUTHENTICATION

Use:

JWT
BCrypt
Stateless Spring Security

Login endpoint:

POST /api/auth/login

Request:

{
"email": "...",
"password": "..."
}

Response should contain:

* token
* email
* role

Frontend must store/use authentication safely.

Do not expose password hashes.

Do not return sensitive user information.

---

# 17. ADMIN API PATTERN

Administrative APIs should use:

/api/admin/**

Examples:

GET    /api/admin/dashboard

GET    /api/admin/programs
POST   /api/admin/programs
PUT    /api/admin/programs/{id}
DELETE /api/admin/programs/{id}

GET    /api/admin/projects
POST   /api/admin/projects
PUT    /api/admin/projects/{id}
DELETE /api/admin/projects/{id}

GET    /api/admin/curriculum
POST   /api/admin/curriculum
PUT    /api/admin/curriculum/{id}
DELETE /api/admin/curriculum/{id}

---

# 18. PUBLIC vs ADMIN DATA

Public API:

Only published content.

Example:

GET /api/programs

should normally return:

published = true

Admin API:

Can see published and unpublished content.

Example:

GET /api/admin/programs

returns all records.

---

# 19. CRUD RULES

Every CRUD implementation should have:

* validation
* authorization
* service layer
* repository
* DTOs
* consistent API responses
* meaningful errors

Do not expose entities directly from controllers.

---

# 20. DELETE RULE

Before deleting an entity:

Check relationships.

Many-to-many relationships must be safely detached before deletion where required.

Do not leave orphaned join-table rows.

Prefer safe deletion behavior.

Where content history is important, consider publish/unpublish or soft-delete instead of immediate deletion.

---

# 21. PAGE CONTENT

Some public pages contain primarily informational content.

Use dynamic page content where appropriate.

Example:

GET /api/pages/{pageKey}

Admin:

GET    /api/admin/pages
POST   /api/admin/pages
PUT    /api/admin/pages/{id}
DELETE /api/admin/pages/{id}

Page keys may include:

HOME
ABOUT
SCHOOLS
TEACHERS
PARENTS
CONTACT

Do not make the page-content model unnecessarily complicated.

---

# 22. LEADS

Contact submissions and school demo requests are business leads.

They must be stored in PostgreSQL.

Admin should be able to:

* view
* search
* inspect details
* update status

Possible statuses:

NEW
CONTACTED
IN_PROGRESS
QUALIFIED
CLOSED

Do not lose submissions.

---

# 23. ADMIN DASHBOARD

Dashboard should eventually show:

* Total programs
* Total projects
* Total curriculum items
* New demo requests
* New contact submissions
* Published content
* Recent activity

Keep the dashboard API lightweight.

Avoid expensive database queries on every request.

---

# 24. PAGINATION

For admin lists that may grow:

Use pagination.

Examples:

Programs
Projects
Blogs
Leads
Demo requests
Contacts
Users

Do not load thousands of records into the browser.

---

# 25. SEARCH AND FILTER

Admin lists should eventually support:

* search
* status filter
* published filter
* sorting
* pagination

Start simple and extend where needed.

---

# 26. MEDIA

Images/videos should not be stored directly as large binary content in normal business tables unless there is a strong reason.

Prefer storing:

* URL
* object key
* metadata

and later integrate object storage/CDN.

Do not break the existing media implementation.

---

# 27. ERROR HANDLING

Use centralized exception handling.

Expected errors:

400 validation
401 unauthenticated
403 unauthorized
404 not found
409 conflict
500 unexpected server error

Do not expose stack traces or internal SQL errors to frontend users.

---

# 28. FRONTEND API ERROR HANDLING

Every API-driven page/component should handle:

* loading
* success
* empty
* error

Do not show blank screens.

Use reusable:

LoadingState
ErrorState
EmptyState

where appropriate.

---

# 29. FRONTEND ADMIN ROUTING

Expected structure:

/admin/login

/admin
/admin/programs
/admin/projects
/admin/curriculum
/admin/pages
/admin/media
/admin/leads
/admin/demo-requests
/admin/users
/admin/settings

Protected routes must verify authentication.

Do not rely only on route hiding.

---

# 30. ADMIN UI DESIGN

Admin UI should be separate from the public marketing design but visually consistent.

Use:

* sidebar
* top bar
* cards
* tables
* filters
* forms
* dialogs
* toast/notifications
* responsive layout

Admin should be usable on desktop and tablet.

---

# 31. PUBLIC WEBSITE DESIGN

Preserve current design.

Base palette:

black
white
grey
zinc

Do not randomly introduce bright colors.

Use Framer Motion sparingly.

The public website must remain:

* modern
* premium
* educational
* responsive
* accessible

---

# 32. CONFIGURATION

Branding should remain configurable.

Example:

siteConfig:

* name
* shortName
* tagline
* logo
* contact
* social links

Theme configuration should remain centralized.

Do not scatter brand values throughout JSX.

---

# 33. SECURITY

Never:

* hardcode production secrets
* commit passwords
* return password hashes
* trust frontend role information
* allow admin APIs without backend authorization
* expose database credentials

Use environment variables.

JWT secret must come from environment configuration in production.

Development defaults may exist only for local development.

---

# 34. TESTING

Before declaring a feature complete:

Backend:

* compile
* start
* migration runs
* Swagger works
* endpoint works
* validation works
* authorization works

Frontend:

* compile
* route works
* API call works
* loading state works
* error state works
* refresh works
* direct URL navigation works

---

# 35. COPILOT WORKFLOW

When implementing a feature:

STEP 1
Inspect existing implementation.

STEP 2
Inspect reference implementation.

STEP 3
Create a mapping:

Current:
X

Reference:
Y

Required:
X + missing logic from Y

STEP 4
Make the smallest safe change.

STEP 5
Run/build/test.

STEP 6
Check affected routes.

STEP 7
Proceed to next feature.

---

# 36. DO NOT DO THIS

Do NOT:

* replace the whole project
* regenerate existing working files unnecessarily
* overwrite existing migrations
* duplicate components
* duplicate APIs
* duplicate entities
* blindly copy reference files
* change database names
* change ports without reason
* change existing public API contracts unnecessarily
* remove existing functionality
* introduce Lombok
* introduce microservices
* hardcode content that should be dynamic

---

# 37. IMPORTANT DEVELOPMENT PRINCIPLE

When the reference implementation and current code differ:

CURRENT PROJECT WINS.

Use the reference only to fill missing functionality.

Preserve existing:

* API paths
* database structure
* frontend routes
* component names
* working UI
* media logic
* existing relationships

unless there is a documented reason to change them.

---

# 38. FINAL EXPECTATION

The end result should be:

PUBLIC WEBSITE
↓
Dynamic React SPA
↓
Spring Boot REST APIs
↓
PostgreSQL

AND

ADMIN PORTAL
↓
JWT Login
↓
Role-based access
↓
Dashboard
↓
CMS / CRUD / Leads / Media
↓
Spring Boot
↓
PostgreSQL

The public website and admin portal must share the same backend data.

Changing a program from the Admin portal must change what the public website displays.

Changing curriculum from Admin must change the public curriculum.

Publishing/unpublishing content must immediately affect public API results.

All changes must preserve existing working flows.
