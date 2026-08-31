import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getCurriculum } from "../../api/curriculumApi";
import SectionHeader from "../common/SectionHeader";

const splitSkills = (value) => {
  if (!value) return [];
  return value
    .split(/[•,|]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
};

export default function Curriculum() {
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCurriculum = async () => {
      try {
        const data = await getCurriculum();
        setCurriculum(data);
      } catch (err) {
        console.error("Failed to load curriculum:", err);
        setError("Unable to load the curriculum right now.");
      } finally {
        setLoading(false);
      }
    };

    loadCurriculum();
  }, []);

  return (
    <section className="section bg-white">
      <div className="container-shell">
        <SectionHeader
          eyebrow="CURRICULUM"
          title="A structured learning pathway from first concepts to innovation."
          text="Each stage is designed to build confidence, technical fluency, and real-world problem-solving skills."
        />

        {loading ? (
          <div className="py-10 text-center text-zinc-500">Loading curriculum...</div>
        ) : error ? (
          <div className="py-10 text-center text-zinc-500">{error}</div>
        ) : curriculum.length === 0 ? (
          <div className="py-10 text-center text-zinc-500">No curriculum data available yet.</div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {curriculum.map((item, index) => (
              <motion.article
                key={item.id || item.levelName}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Stage {index + 1}
                  </span>
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white">
                    {item.gradeRange}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-zinc-900">{item.levelName}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-zinc-500">
                  Learning level
                </p>

                <div className="mt-6 space-y-4 text-zinc-600">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      Learning outcomes
                    </h4>
                    <p className="mt-2 leading-7">{item.learningObjectives || "Build understanding through hands-on exploration and guided project work."}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
                      Skills developed
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {splitSkills(item.skills).map((skill) => (
                        <span key={skill} className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link to={`/curriculum/${item.slug}`} className="mt-7 inline-flex font-semibold">
                  View pathway →
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
