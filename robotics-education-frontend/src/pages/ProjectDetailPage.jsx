import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../api/projectApi";

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

  return (
    <main className="section bg-zinc-950 text-white">
      <div className="container-shell max-w-5xl">
        <Link to="/projects" className="text-sm font-medium text-zinc-400">← Back to projects</Link>

        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8 md:p-12">
          {project.imageUrl && (
            <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800">
              <img src={project.imageUrl} alt={project.title} className="h-72 w-full object-cover md:h-96" />
            </div>
          )}
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
