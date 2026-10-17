import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { getCurriculum } from "../../api/curriculumApi";
import SectionHeader from "../common/SectionHeader";
import { createReturnState } from "../../utils/navigation";

const splitSkills = (value) => {
  if (!value) return [];
  return value
    .split(/[•,|]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
};

export default function Curriculum() {
  const location = useLocation();
  const [curriculum, setCurriculum] = useState([]);
  const [activeStage, setActiveStage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCurriculum = async () => {
      try {
        const data = await getCurriculum();
        setCurriculum(data);
        setActiveStage(data[0]?.id ?? data[0]?.slug ?? null);
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
    <section id="curriculum-list" className="section scroll-mt-24 bg-white">
      <div className="container-shell">
        <SectionHeader
          eyebrow="CURRICULUM"
          title="A structured learning pathway from first concepts to innovation."
          text="Each stage is designed to build confidence, technical fluency, and real-world problem-solving skills."
        />

        {loading ? (
          <div className="py-10 text-center text-zinc-500" role="status">Loading curriculum...</div>
        ) : error ? (
          <div className="py-10 text-center text-zinc-500">{error}</div>
        ) : curriculum.length === 0 ? (
          <div className="py-10 text-center text-zinc-500">No curriculum data available yet.</div>
        ) : (
          <>
            <div className="mb-9 overflow-x-auto pb-2">
              <div className="flex min-w-max items-center" role="group" aria-label="Select a curriculum stage">
                {curriculum.map((item, index) => {
                  const stageId = item.id ?? item.slug;
                  const isActive = activeStage === stageId;
                  return (
                    <div key={stageId} className="flex items-center">
                      <button
                        type="button"
                        aria-pressed={isActive}
                        aria-controls={`curriculum-stage-${stageId}`}
                        onClick={() => {
                          setActiveStage(stageId);
                          document.getElementById(`curriculum-stage-${stageId}`)?.scrollIntoView({
                            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                            block: "center",
                          });
                        }}
                        className="group flex min-h-12 items-center gap-3 rounded-full px-3 py-2 text-left transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 aria-pressed:bg-zinc-900 aria-pressed:text-white"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-xs font-bold text-zinc-600 transition group-aria-pressed:border-white group-aria-pressed:bg-white group-aria-pressed:text-zinc-900">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <span className="block max-w-40 truncate text-sm font-semibold">{item.levelName}</span>
                          <span className="block text-xs opacity-70">{item.gradeRange}</span>
                        </span>
                      </button>
                      {index < curriculum.length - 1 && <span aria-hidden="true" className="mx-2 h-px w-5 bg-zinc-300 sm:mx-4 sm:w-10" />}
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="sr-only" aria-live="polite">
              Selected stage: {curriculum.find((item) => (item.id ?? item.slug) === activeStage)?.levelName}
            </p>
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {curriculum.map((item, index) => (
                <motion.article
                  key={item.id || item.levelName}
                  id={`curriculum-stage-${item.id ?? item.slug}`}
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: Math.min(index % 3, 2) * 0.06 }}
                  className={`rounded-3xl border bg-zinc-50 p-7 shadow-sm transition-colors ${activeStage === (item.id ?? item.slug) ? "border-zinc-900 ring-1 ring-zinc-900" : "border-zinc-200"}`}
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

                  <Link
                    to={`/curriculum/${item.slug}`}
                    state={createReturnState(location, {
                      hash: location.pathname === "/" ? "#curriculum-list" : location.hash,
                      label: "curriculum",
                    })}
                    className="mt-7 inline-flex font-semibold"
                  >
                    View pathway →
                  </Link>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
