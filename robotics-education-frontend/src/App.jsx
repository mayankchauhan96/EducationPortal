import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TeachersPage from "./components/pages/TeachersPage";
import ParentsPage from "./components/pages/ParentsPage";
import StudentsPage from "./components/pages/StudentsPage";
import AboutPage from "./components/pages/AboutPage";
import BlogsPage from "./components/pages/BlogsPage";
import TestimonialsPage from "./components/pages/TestimonialsPage";
import ContactPage from "./pages/ContactPage";
import DemoRequestPage from "./pages/DemoRequestPage";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import CurriculumDetailPage from "./pages/CurriculumDetailPage";
import MainLayout from "./components/layout/MainLayout";
import AdminRoute from "./pages/admin/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminProgramsPage from "./pages/admin/AdminProgramsPage";
import AdminProjectsPage from "./pages/admin/AdminProjectsPage";
import AdminCurriculumPage from "./pages/admin/AdminCurriculumPage";
import AdminPageContentPage from "./pages/admin/AdminPageContentPage";
import TestimonialsAdminPage from "./pages/admin/TestimonialsAdminPage";
import AdminContactsPage from "./pages/admin/AdminContactsPage";
import AdminDemoRequestsPage from "./pages/admin/AdminDemoRequestsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";

const Programs = lazy(() => import("./components/home/Programs"));
const Projects = lazy(() => import("./components/home/Projects"));
const Curriculum = lazy(() => import("./components/home/Curriculum"));
const ForSchools = lazy(() => import("./components/home/ForSchools"));

export default function App() {
  return (
    <Suspense fallback={<div className="section text-center text-zinc-500" role="status">Loading page…</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetailPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/curriculum/:slug" element={<CurriculumDetailPage />} />
          <Route path="/schools" element={<ForSchools />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/parents" element={<ParentsPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/testimonials/partner-schools" element={<TestimonialsPage pageKey="testimonials-partner-schools" eyebrow="PARTNER SCHOOLS" title="Schools building what comes next." description="See how partner schools bring robotics, coding, and hands-on STEM learning into the classroom." />} />
          <Route path="/testimonials/students" element={<TestimonialsPage pageKey="testimonials-students" eyebrow="STUDENT STORIES" title="Student ambition in action." description="Real moments from students building, coding, and solving problems with confidence." />} />
          <Route path="/testimonials/labs" element={<TestimonialsPage pageKey="testimonials-labs" eyebrow="LAB STORIES" title="Hands-on learning in the lab." description="Behind-the-scenes moments from robotics labs, prototyping, and experimentation." />} />
          <Route path="/testimonials/community" element={<TestimonialsPage pageKey="testimonials-community" eyebrow="COMMUNITY STORIES" title="A community that keeps growing." description="Stories from partner schools, events, and collaborative learning experiences." />} />
          <Route path="/testimonials/others" element={<TestimonialsPage pageKey="testimonials-others" eyebrow="MORE STORIES" title="More moments from the learning journey." description="Additional classroom, workshop, and school stories from our ecosystem." />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demo-request" element={<DemoRequestPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/programs" element={<AdminProgramsPage />} />
            <Route path="/admin/projects" element={<AdminProjectsPage />} />
            <Route path="/admin/curriculum" element={<AdminCurriculumPage />} />
            <Route path="/admin/page-content" element={<AdminPageContentPage />} />
            <Route path="/admin/testimonials" element={<TestimonialsAdminPage />} />
            <Route path="/admin/contacts" element={<AdminContactsPage />} />
            <Route path="/admin/demo-requests" element={<AdminDemoRequestsPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}