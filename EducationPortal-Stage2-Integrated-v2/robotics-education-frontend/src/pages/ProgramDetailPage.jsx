import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProgramBySlug } from "../api/programApi";

export default function ProgramDetailPage() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProgram = async () => {
      try {
        const data = await getProgramBySlug(slug);
        setProgram(data);
      } catch (err) {
        console.error("Failed to load program:", err);
        setError("Unable to load this program right now.");
      } finally {
        setLoading(false);
      }
    };

    loadProgram();
  }, [slug]);

  if (loading) return <div className="container-shell py-24 text-zinc-500">Loading program...</div>;
  if (error) return <div className="container-shell py-24 text-zinc-500">{error}</div>;
  if (!program) return <div className="container-shell py-24 text-zinc-500">Program not found.</div>;

  return (
    <main className="section bg-white">
      <div className="container-shell max-w-5xl">
        <Link to="/programs" className="text-sm font-medium text-zinc-500">← Back to programs</Link>

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 md:p-12">
          <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">{program.tag}</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">{program.title}</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-700">{program.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-zinc-700">{program.ageGroup}</span>
            <span className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-zinc-700">{program.displayOrder}</span>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-3xl font-bold text-zinc-900">Associated projects</h2>
          {(!program.projects || program.projects.length === 0) ? (
            <p className="mt-4 text-zinc-600">No projects are linked to this program yet.</p>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {program.projects.map((project) => (
                <div key={project.slug} className="rounded-3xl border border-zinc-200 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-zinc-900">{project.title}</h3>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-600">{project.difficulty}</span>
                  </div>
                  <p className="mt-3 text-zinc-600">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600">
                    {project.gradeRange && <span className="rounded-full border border-zinc-300 px-2 py-1">{project.gradeRange}</span>}
                    {project.skills && <span className="rounded-full border border-zinc-300 px-2 py-1">{project.skills}</span>}
                  </div>
                  <Link to={`/projects/${project.slug}`} className="mt-6 inline-flex font-semibold">View project →</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
