import { Link } from "react-router-dom";
import PageContentSection from "../common/PageContentSection";

const fallbackSections = [
  {
    id: "parents-1",
    sectionTitle: "Why it matters",
    sectionBody: "Robotics and STEM learning help students build practical problem-solving skills that matter in school and beyond.",
    bullets: "Confidence building|Creative thinking|Future-ready skills",
  },
  {
    id: "parents-2",
    sectionTitle: "What students gain",
    sectionBody: "Students develop the ability to design, test, improve, and explain solutions using technology in a meaningful way.",
    bullets: "Coding literacy|Engineering mindset|Hands-on curiosity",
  },
  {
    id: "parents-3",
    sectionTitle: "A supportive learning experience",
    sectionBody: "Our approach keeps learning approachable, engaging, and motivating while still building strong technical foundations.",
    bullets: "Progressive learning|Real-world application|Positive engagement",
  },
];

export default function ParentsPage() {
  return (
    <>
      <PageContentSection
        pageKey="parents"
        eyebrow="FOR PARENTS"
        title="A learning journey that builds skills, confidence, and curiosity."
        intro="We help students explore technology in a way that feels practical, relevant, and exciting for their future."
        className="bg-white"
        fallbackSections={fallbackSections}
      />

      <div className="container-shell pb-16">
        <div className="flex flex-wrap gap-4">
          <Link to="/students" className="btn-primary">See student experience</Link>
          <Link to="/teachers" className="btn-secondary">Explore teacher support</Link>
        </div>
      </div>
    </>
  );
}
