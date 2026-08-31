import { Link } from "react-router-dom";
import PageContentSection from "../common/PageContentSection";

const fallbackSections = [
  {
    id: "teachers-1",
    sectionTitle: "Teacher training",
    sectionBody: "We help educators build confidence with structured training, classroom strategies, and hands-on support.",
    bullets: "Training workshops|Practical lesson flow|Confidence building",
  },
  {
    id: "teachers-2",
    sectionTitle: "Lesson support",
    sectionBody: "Teachers get clear project guides, classroom resources, and pacing support that make robotics more manageable to deliver.",
    bullets: "Ready-to-use plans|Project roadmaps|Assessment support",
  },
  {
    id: "teachers-3",
    sectionTitle: "Classroom implementation",
    sectionBody: "From first setup to advanced project delivery, we support schools with guidance that keeps learning engaging and consistent.",
    bullets: "Student progression|Resource planning|Ongoing guidance",
  },
];

export default function TeachersPage() {
  return (
    <>
      <PageContentSection
        pageKey="teachers"
        eyebrow="FOR TEACHERS"
        title="Support that makes classroom delivery easier and more effective."
        intro="Our teacher resources focus on confidence, clarity, and practical implementation for STEM learning in school settings."
        className="bg-zinc-50"
        fallbackSections={fallbackSections}
      />

      <div className="container-shell pb-16">
        <div className="flex flex-wrap gap-4">
          <Link to="/students" className="btn-primary">Support student learning</Link>
          <Link to="/parents" className="btn-secondary">See parent resources</Link>
        </div>
      </div>
    </>
  );
}
