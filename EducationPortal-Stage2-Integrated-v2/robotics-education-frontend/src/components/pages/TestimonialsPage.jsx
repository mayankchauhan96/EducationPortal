import PageContentSection from "../common/PageContentSection";

const fallbackSections = [
  {
    id: "testimonials-1",
    sectionTitle: "School community impact",
    sectionBody: "Teachers and school leaders consistently highlight how hands-on robotics experiences improve engagement and learning outcomes.",
    bullets: "Stronger engagement|Better classroom energy|Visible student growth",
  },
  {
    id: "testimonials-2",
    sectionTitle: "Parent confidence",
    sectionBody: "Families appreciate the practical, confidence-building nature of STEM learning and the sense of excitement it brings to students.",
    bullets: "Supportive learning|Real progress|Future-ready mindset",
  },
  {
    id: "testimonials-3",
    sectionTitle: "Student voice",
    sectionBody: "Students often describe these experiences as motivating, creative, and empowering because they see themselves solving real challenges.",
    bullets: "Hands-on confidence|Creative thinking|Teamwork development",
  },
];

export default function TestimonialsPage() {
  return (
    <PageContentSection
      pageKey="testimonials"
      eyebrow="TESTIMONIALS"
      title="What schools, teachers, parents, and students are saying."
      intro="Real feedback from people building confidence, creativity, and curiosity through technology-based learning."
      className="bg-white"
      fallbackSections={fallbackSections}
    />
  );
}
