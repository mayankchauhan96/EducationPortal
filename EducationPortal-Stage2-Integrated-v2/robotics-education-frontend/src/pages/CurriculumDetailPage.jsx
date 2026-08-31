import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCurriculumBySlug } from "../api/curriculumApi";

export default function CurriculumDetailPage() {
  const { slug } = useParams();
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCurriculum = async () => {
      try {
        const data = await getCurriculumBySlug(slug);
        if (!data) {
          throw new Error("No curriculum data returned");
        }
        setCurriculum(data);
      } catch (err) {
        console.error("Failed to load curriculum:", err);
        setError("Unable to load this curriculum right now.");
      } finally {
        setLoading(false);
      }
    };

    loadCurriculum();
  }, [slug]);

  if (loading) return <div className="container-shell py-24 text-zinc-500">Loading curriculum...</div>;
  if (error) return <div className="container-shell py-24 text-zinc-500">{error}</div>;
  if (!curriculum) return <div className="container-shell py-24 text-zinc-500">Curriculum not found.</div>;

  return (
    <main className="section bg-white">
      <div className="container-shell max-w-5xl">
        <Link to="/curriculum" className="text-sm font-medium text-zinc-500">← Back to curriculum</Link>

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 md:p-12">
          <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">{curriculum.gradeRange}</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">{curriculum.levelName}</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-700">{curriculum.learningObjectives}</p>
        </div>

        <div className="mt-14">
          <h2 className="text-3xl font-bold text-zinc-900">Programs in this pathway</h2>
          {(!curriculum.programs || curriculum.programs.length === 0) ? (
            <p className="mt-4 text-zinc-600">No programs are linked to this curriculum stage yet.</p>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {curriculum.programs.map((program) => (
                <div key={program.slug} className="rounded-3xl border border-zinc-200 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-zinc-900">{program.title}</h3>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-600">{program.tag}</span>
                  </div>
                  <p className="mt-3 text-zinc-600">{program.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600">
                    <span className="rounded-full border border-zinc-300 px-2 py-1">{program.ageGroup}</span>
                  </div>
                  <Link to={`/programs/${program.slug}`} className="mt-6 inline-flex font-semibold">View program →</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
