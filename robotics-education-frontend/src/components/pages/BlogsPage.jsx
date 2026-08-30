import PageContentSection from "../common/PageContentSection";

const fallbackSections = [
  {
    id: "blogs-1",
    sectionTitle: "STEM learning in action",
    sectionBody: "Explore practical stories, classroom ideas, and project inspiration for robotics and technology education.",
    bullets: "Project ideas|Classroom strategies|Innovation highlights",
  },
  {
    id: "blogs-2",
    sectionTitle: "Teacher resources",
    sectionBody: "Useful insights for planning, facilitation, and helping students connect technology to real-world problem solving.",
    bullets: "Lesson planning|Student engagement|Practical support",
  },
  {
    id: "blogs-3",
    sectionTitle: "Learning updates",
    sectionBody: "Follow recent ideas, educational trends, and ways schools are building stronger STEM experiences for students.",
    bullets: "STEM trends|Implementation stories|Student outcomes",
  },
];

export default function BlogsPage() {
  return (
    <PageContentSection
      pageKey="blogs"
      eyebrow="BLOGS"
      title="Ideas, stories, and learning inspiration for educators and families."
      intro="A simple place to share classroom insights, project inspiration, and practical approaches to technology education."
      className="bg-zinc-50"
      fallbackSections={fallbackSections}
    />
  );
}
