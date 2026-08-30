import PageContentSection from "../common/PageContentSection";

const fallbackSections = [
  {
    id: "about-1",
    sectionTitle: "Our mission",
    sectionBody: "We believe learning should be active, practical, and future-focused so students can build confidence through doing.",
    bullets: "Project-based learning|STEM skill development|School collaboration",
  },
  {
    id: "about-2",
    sectionTitle: "Our philosophy",
    sectionBody: "Students learn best when they are solving real problems, iterating on ideas, and connecting technology to the world around them.",
    bullets: "Creativity and experimentation|Industry-inspired learning|Meaningful classroom outcomes",
  },
  {
    id: "about-3",
    sectionTitle: "How we work with schools",
    sectionBody: "We support educators with frameworks, resources, and practical guidance that make robotics programs easier to implement and sustain.",
    bullets: "Teacher support|Curriculum design|Student engagement",
  },
];

export default function AboutPage() {
  return (
    <PageContentSection
      pageKey="about"
      eyebrow="ABOUT US"
      title="We believe learning should be active, practical, and future-focused."
      intro="Our mission is to help students build real-world skills through robotics, coding, engineering, and STEM experiences."
      className="bg-zinc-50"
      fallbackSections={fallbackSections}
    />
  );
}
