import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Programs from "./components/home/Programs";
import Projects from "./components/home/Projects";
import Curriculum from "./components/home/Curriculum";
import ForSchools from "./components/home/ForSchools";
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
import AdminContactsPage from "./pages/admin/AdminContactsPage";
import AdminDemoRequestsPage from "./pages/admin/AdminDemoRequestsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";

export default function App() {
  return (
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
          <Route path="/admin/contacts" element={<AdminContactsPage />} />
          <Route path="/admin/demo-requests" element={<AdminDemoRequestsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}