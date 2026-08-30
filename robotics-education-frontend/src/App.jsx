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

function Placeholder({ title }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="text-center px-6">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-3">Coming next</p>
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </main>
  );
}

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
    </Routes>
  );
}