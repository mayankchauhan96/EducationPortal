import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPageContent } from "../../api/pageContentApi";
import SectionHeader from "../common/SectionHeader";

const fallbackSections = [
  {
    id: "schools-1",
    sectionTitle: "Structured curriculum",
    sectionBody: "A clear learning path from beginner robotics to advanced design, coding, and problem-solving experiences.",
    bullets: "Age-appropriate learning paths|Project-based classroom implementation|Teacher-ready guidelines",
  },
  {
    id: "schools-2",
    sectionTitle: "Robotics kits and resources",
    sectionBody: "Schools receive practical equipment, lab resources, and implementation support to make the program easy to run.",
    bullets: "Hands-on robotics kits|Electronics and sensor kits|Student support resources",
  },
  {
    id: "schools-3",
    sectionTitle: "Teacher enablement",
    sectionBody: "We help educators build confidence through training, lesson planning, and guidance for STEM delivery.",
    bullets: "Teacher training|Lesson planning support|Continuous mentoring",
  },
  {
    id: "schools-4",
    sectionTitle: "School impact",
    sectionBody: "The program combines innovation, engagement, and measurable student outcomes in a sustainable school model.",
    bullets: "Skill-building programs|Student engagement|Long-term STEM growth",
  },
];

export default function ForSchools() {
  const [sections, setSections] = useState(fallbackSections);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSections = async () => {
      try {
        const data = await getPageContent("schools");
        if (Array.isArray(data) && data.length > 0) {
          setSections(data);
        } else {
          setSections(fallbackSections);
        }
      } catch (err) {
        console.warn("Using fallback schools content because the backend page-content API is unavailable:", err);
        setSections(fallbackSections);
      } finally {
        setLoading(false);
      }
    };

    loadSections();
  }, []);

  const splitBullets = (bullets) => {
    if (!bullets) return [];
    return bullets
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  return (
    <section className="section bg-white">
      <div className="container-shell">
        <SectionHeader
          eyebrow="FOR SCHOOLS"
          title="A complete program, not just a box of kits."
          text="We help schools create meaningful hands-on learning without adding unnecessary complexity to teachers or administrators."
        />

        {loading ? (
          <div className="py-8 text-center text-zinc-500">Loading schools content...</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {sections.map((section) => (
              <article key={section.id} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7">
                <h3 className="text-2xl font-bold text-zinc-900">{section.sectionTitle}</h3>
                <p className="mt-4 leading-7 text-zinc-600">{section.sectionBody}</p>

                {splitBullets(section.bullets).length > 0 && (
                  <ul className="mt-5 space-y-3 text-sm text-zinc-700">
                    {splitBullets(section.bullets).map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-zinc-900" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link to="/contact" className="btn-primary">Bring Robotics to Your School <span>↗</span></Link>
        </div>
      </div>
    </section>
  );
}