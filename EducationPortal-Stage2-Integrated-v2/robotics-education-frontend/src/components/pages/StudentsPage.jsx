import PageContentSection from "../common/PageContentSection";

const fallbackSections = [
  {
    id: "students-1",
    sectionTitle: "Learn by building",
    sectionBody: "Students move from ideas to prototypes by designing, testing, debugging, and improving real projects.",
    bullets: "Hands-on labs|Creative problem solving|Iterative design",
  },
  {
    id: "students-2",
    sectionTitle: "Develop practical skills",
    sectionBody: "Every project strengthens thinking, teamwork, and the confidence to solve problems with technology.",
    bullets: "Coding skills|Engineering mindset|Communication",
  },
  {
    id: "students-3",
    sectionTitle: "Grow step by step",
    sectionBody: "Students progress through structured experiences that build from foundational concepts to more complex technology challenges.",
    bullets: "Foundations first|Confidence through practice|Real project outcomes",
  },
];

import { Link } from "react-router-dom";

export default function StudentsPage() {
  return (
    <>
      <PageContentSection
        pageKey="students"
        eyebrow="FOR STUDENTS"
        title="Build, test, improve, and discover what you can create."
        intro="Our programs help students turn curiosity into hands-on learning through design, coding, robotics, and teamwork."
        className="bg-white"
        fallbackSections={fallbackSections}
      />

      <div className="container-shell pb-16">
        <div className="flex flex-wrap gap-4">
          <Link to="/teachers" className="btn-primary">Explore teacher resources</Link>
          <Link to="/parents" className="btn-secondary">See parent guidance</Link>
        </div>
      </div>
    </>
  );
}
