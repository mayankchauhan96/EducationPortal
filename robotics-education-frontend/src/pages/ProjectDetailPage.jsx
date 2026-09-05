import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../api/projectApi";

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
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#111827"/>
          <stop offset="100%" stop-color="${theme}"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="720" fill="url(#g)"/>
      <circle cx="980" cy="140" r="150" fill="rgba(255,255,255,0.08)"/>
      <circle cx="200" cy="570" r="210" fill="rgba(255,255,255,0.06)"/>
      <text x="600" y="330" text-anchor="middle" font-size="220" fill="#f4f4f5" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif">${icon}</text>
      <text x="600" y="410" text-anchor="middle" font-size="34" fill="#d4d4d8" font-family="Arial, sans-serif" letter-spacing="4">${(difficulty || "PROJECT").toUpperCase()}</text>
      <text x="600" y="500" text-anchor="middle" font-size="36" fill="#fafafa" font-family="Arial, sans-serif">${label.slice(0, 28)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error("Failed to load project:", err);
        setError("Unable to load this project right now.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  if (loading) return <div className="container-shell py-24 text-zinc-500">Loading project...</div>;
  if (error) return <div className="container-shell py-24 text-zinc-500">{error}</div>;
  if (!project) return <div className="container-shell py-24 text-zinc-500">Project not found.</div>;

  const imageSrc = isUsableImageUrl(project.imageUrl)
    ? project.imageUrl
    : createProjectImage(project.title, project.difficulty);

  return (
    <main className="section bg-zinc-950 text-white">
      <div className="container-shell max-w-5xl">
        <Link to="/projects" className="text-sm font-medium text-zinc-400">← Back to projects</Link>

        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8 md:p-12">
          <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800">
            <img src={imageSrc} alt={project.title} className="h-72 w-full object-contain md:h-96" />
          </div>
          <span className="text-xs uppercase tracking-[0.22em] text-zinc-400">{project.difficulty}</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-300">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {project.gradeRange && <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-zinc-300">{project.gradeRange}</span>}
            {project.skills && <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-zinc-300">{project.skills}</span>}
          </div>
        </div>
      </div>
    </main>
  );
}
