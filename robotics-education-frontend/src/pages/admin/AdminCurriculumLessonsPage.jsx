import { useEffect, useState } from "react";
import { getAdminCurriculum } from "../../api/adminApi";
import {
  createCurriculumLesson,
  deleteCurriculumLesson,
  getCurriculumLessons,
  updateCurriculumLesson,
} from "../../api/learningApi";

const emptyForm = { title: "", description: "", displayOrder: 0, published: true };

export default function AdminCurriculumLessonsPage() {
  const [curricula, setCurricula] = useState([]);
  const [curriculumId, setCurriculumId] = useState("");
  const [lessons, setLessons] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadStages = async () => {
    try {
      const items = await getAdminCurriculum();
      setCurricula(items);
      setCurriculumId((current) => current || String(items[0]?.id || ""));
    } catch (e) {
      setError(e.response?.data?.message || "Could not load curriculum stages.");
    } finally {
      setLoading(false);
    }
  };

  const loadLessons = async () => {
    if (!curriculumId) {
      setLessons([]);
      return;
    }
    try {
      setLessons(await getCurriculumLessons(curriculumId));
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || "Could not load curriculum lessons.");
    }
  };

  useEffect(() => { loadStages(); }, []);
  useEffect(() => { loadLessons(); }, [curriculumId]);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    const payload = { ...form, displayOrder: Number(form.displayOrder) };
    try {
      if (editingId) await updateCurriculumLesson(curriculumId, editingId, payload);
      else await createCurriculumLesson(curriculumId, payload);
      setForm(emptyForm);
      setEditingId(null);
      setNotice(editingId ? "Lesson updated." : "Lesson created.");
      await loadLessons();
    } catch (e) {
      setError(e.response?.data?.message || "Could not save lesson.");
    }
  };

  const edit = (lesson) => {
    setEditingId(lesson.id);
    setForm({
      title: lesson.title,
      description: lesson.description || "",
      displayOrder: lesson.displayOrder ?? 0,
      published: lesson.published,
    });
  };

  const remove = async (lesson) => {
    if (!window.confirm(`Delete "${lesson.title}"?`)) return;
    setError("");
    try {
      await deleteCurriculumLesson(curriculumId, lesson.id);
      setNotice("Lesson deleted.");
      await loadLessons();
    } catch (e) {
      setError(e.response?.data?.message || "Could not delete lesson.");
    }
  };

  return (
    <div className="p-5 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow">CURRICULUM</p>
        <h1 className="section-title">Lessons & Topics</h1>
        <p className="mt-2 text-zinc-600">Published lessons appear in the progress portal for students assigned to that curriculum stage.</p>
        {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="mt-5 rounded-xl bg-zinc-100 p-4 text-sm">{notice}</p>}
        {loading ? <p className="mt-8 text-zinc-500" role="status">Loading curriculum…</p> : (
          <>
            <label className="mt-8 block max-w-lg text-sm font-medium">Curriculum stage
              <select value={curriculumId} onChange={(e) => { setCurriculumId(e.target.value); setLessons([]); }} className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5">
                <option value="">Select a curriculum stage</option>
                {curricula.map((item) => <option key={item.id} value={item.id}>{item.levelName}</option>)}
              </select>
            </label>
            {!!curriculumId && (
              <form onSubmit={submit} className="mt-6 grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 md:grid-cols-2">
                <h2 className="text-lg font-bold md:col-span-2">{editingId ? "Edit lesson" : "Add lesson"}</h2>
                <label className="text-sm font-medium">Title <span className="text-red-600">*</span>
                  <input required maxLength={160} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2.5" />
                </label>
                <label className="text-sm font-medium">Display order
                  <input type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2.5" />
                </label>
                <label className="text-sm font-medium md:col-span-2">Description
                  <textarea maxLength={1000} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2.5" />
                </label>
                <label className="flex items-center gap-2 text-sm md:col-span-2">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                  Published
                </label>
                <div className="flex gap-3 md:col-span-2">
                  <button className="btn-primary">{editingId ? "Save changes" : "Add lesson"}</button>
                  {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="rounded-xl border border-zinc-300 px-4 py-2">Cancel</button>}
                </div>
              </form>
            )}
            <div className="mt-6 space-y-3">
              {lessons.map((lesson) => (
                <article key={lesson.id} className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold">{lesson.title}</h2>
                    <p className="mt-1 text-sm text-zinc-600">{lesson.description || "No description"} · Order {lesson.displayOrder} · {lesson.published ? "Published" : "Draft"}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => edit(lesson)} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm">Edit</button>
                    <button onClick={() => remove(lesson)} className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700">Delete</button>
                  </div>
                </article>
              ))}
              {!!curriculumId && !lessons.length && <p className="rounded-2xl bg-zinc-100 p-5 text-sm text-zinc-600">No lessons have been added to this stage.</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
