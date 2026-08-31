import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjects } from "../../api/projectApi";
import SectionHeader from "../common/SectionHeader";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Unable to load student projects right now.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section className="section bg-zinc-950 text-white">
      <div className="container-shell">
        <SectionHeader
          eyebrow="STUDENT PROJECTS"
          title="What will your students build?"
          text="Real projects make learning visible. Every project connects concepts to a tangible outcome."
        />

        {loading ? (
          <div className="py-10 text-center text-zinc-400">Loading projects...</div>
        ) : error ? (
          <div className="py-10 text-center text-zinc-300">{error}</div>
        ) : projects.length === 0 ? (
          <div className="py-10 text-center text-zinc-400">No projects available yet.</div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.id || project.slug}
                whileHover={{ y: -7 }}
                className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
              >
                <div className="aspect-[4/3] relative bg-zinc-800 overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(#a1a1aa 1px, transparent 1px), linear-gradient(90deg, #a1a1aa 1px, transparent 1px)",
                    backgroundSize: "28px 28px"
                  }} />
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-black text-zinc-700">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-900/20 to-transparent" />
                </div>
                <div className="p-7">
                  <span className="text-xs uppercase tracking-widest text-zinc-500">{project.difficulty || "Project"}</span>
                  <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>
                  <p className="mt-3 text-zinc-400">{project.skills || project.description}</p>
                  <div className="mt-4 text-sm text-zinc-400">{project.gradeRange}</div>
                  <Link to={`/projects/${project.slug}`} className="mt-6 inline-flex font-semibold">View Project →</Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}