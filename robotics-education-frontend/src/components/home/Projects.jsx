import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjects } from "../../api/projectApi";
import SectionHeader from "../common/SectionHeader";

const isUsableImageUrl = (url) => {
  if (!url || !url.trim()) return false;

  try {
    const parsed = new URL(url);
    return /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(parsed.pathname);
  } catch {
    return false;
  }
};

const createProjectImage = (title, difficulty = "Project") => {
  const label = (title || "Project").replace(/\s+/g, " ").trim();
  const lower = label.toLowerCase();

  let icon = "⚙️";
  let theme = "#27272a";
  if (lower.includes("traffic") || lower.includes("signal")) {
    icon = "🚦";
    theme = "#1f2937";
  } else if (lower.includes("plant") || lower.includes("garden") || lower.includes("watering")) {
    icon = "🌱";
    theme = "#14532d";
  } else if (lower.includes("joystick") || lower.includes("football") || lower.includes("goalkeeper") || lower.includes("robot")) {
    icon = "🤖";
    theme = "#3f3f46";
  } else if (lower.includes("iot") || lower.includes("smart") || lower.includes("system")) {
    icon = "📡";
    theme = "#0f172a";
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="675" viewBox="0 0 900 675">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#111827"/>
          <stop offset="100%" stop-color="${theme}"/>
        </linearGradient>
      </defs>
      <rect width="900" height="675" fill="url(#g)"/>
      <circle cx="760" cy="120" r="110" fill="rgba(255,255,255,0.08)"/>
      <circle cx="160" cy="520" r="170" fill="rgba(255,255,255,0.06)"/>
      <rect x="70" y="70" width="760" height="535" rx="28" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)"/>
      <text x="450" y="330" text-anchor="middle" font-size="180" fill="#f4f4f5" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif">${icon}</text>
      <text x="450" y="420" text-anchor="middle" font-size="28" fill="#d4d4d8" font-family="Arial, sans-serif" letter-spacing="3">${(difficulty || "PROJECT").toUpperCase()}</text>
      <text x="450" y="485" text-anchor="middle" font-size="28" fill="#fafafa" font-family="Arial, sans-serif">${label.slice(0, 26)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export default function Projects({ limit }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        const normalizedProjects = (Array.isArray(data) ? data : [])
          .filter((project) => project)
          .map((project) => ({
            ...project,
            imageUrl: isUsableImageUrl(project.imageUrl)
              ? project.imageUrl
              : createProjectImage(project.title, project.difficulty),
          }));

        const shuffled = [...normalizedProjects];
        for (let i = shuffled.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        const result = typeof limit === "number" ? shuffled.slice(0, limit) : shuffled;
        setProjects(result);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Unable to load student projects right now.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [limit]);

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