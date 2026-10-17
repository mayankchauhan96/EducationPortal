import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getParentProgress,
  getPrincipalProgress,
  getStudentProgress,
  getTeacherClasses,
  getTeacherClassProgress,
  recordStudentWork,
  updateStudentLesson,
  updateStudentWork,
} from "../../api/learningApi";
import { clearAdminSession, getAdminSession } from "../../utils/adminAuth";

const panelClass = "rounded-2xl border border-zinc-200 bg-white p-5";

function ProgressCard({ student, readOnly = false, onUpdateLesson, onUpdateWork, onRecordWork }) {
  const [workType, setWorkType] = useState("PROJECT");
  const [workTitle, setWorkTitle] = useState("");
  const [workCompleted, setWorkCompleted] = useState(false);
  const [error, setError] = useState("");
  const percentage = student.totalLessons ? Math.round((student.completedLessons / student.totalLessons) * 100) : 0;

  const saveWork = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await onRecordWork(student.studentId, {
        type: workType,
        title: workTitle,
        completed: workCompleted,
        notes: "",
      });
      setWorkTitle("");
      setWorkCompleted(false);
    } catch (e) {
      setError(e.response?.data?.message || "Could not update student work.");
    }
  };

  return (
    <section className={panelClass}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">{student.email}</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {[student.schoolName, student.classroomName, student.curriculumName].filter(Boolean).join(" · ") || "No classroom assigned"}
          </p>
        </div>
        <div className="min-w-32 text-right">
          <p className="font-semibold">{student.completedLessons} / {student.totalLessons} lessons</p>
          <p className="text-sm text-zinc-500">{percentage}% complete</p>
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100" aria-label={`${percentage}% of lessons completed`}>
        <div className="h-full bg-zinc-800" style={{ width: `${percentage}%` }} />
      </div>

      <div className="mt-5">
        <h3 className="font-semibold">Syllabus</h3>
        <div className="mt-2 divide-y divide-zinc-100">
          {student.lessons.map((lesson) => (
            <div key={lesson.lessonId} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">{lesson.title}</p>
                {lesson.description && <p className="mt-1 text-sm text-zinc-500">{lesson.description}</p>}
                {lesson.notes && <p className="mt-1 text-xs text-zinc-500">Teacher note: {lesson.notes}</p>}
              </div>
              {readOnly ? (
                <span className={`text-sm font-medium ${lesson.completed ? "text-zinc-800" : "text-zinc-500"}`}>{lesson.completed ? "Completed" : "Not completed"}</span>
              ) : (
                <button
                  onClick={() => onUpdateLesson(student.studentId, lesson.lessonId, { completed: !lesson.completed, notes: lesson.notes || "" })}
                  className={`rounded-lg px-3 py-2 text-sm ${lesson.completed ? "bg-zinc-100 text-zinc-700" : "bg-zinc-900 text-white"}`}
                >
                  {lesson.completed ? "Mark incomplete" : "Mark complete"}
                </button>
              )}
            </div>
          ))}
          {!student.lessons.length && <p className="py-3 text-sm text-zinc-500">No published lessons in this curriculum yet.</p>}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-semibold">Projects & assignments</h3>
        {student.work.length ? (
          <ul className="mt-2 divide-y divide-zinc-100">
            {student.work.map((work) => (
              <li key={work.id} className="flex justify-between gap-4 py-3 text-sm">
                <span><span className="font-medium">{work.title}</span><span className="ml-2 text-zinc-500">{work.type.toLowerCase()}</span></span>
                <span className="flex shrink-0 items-center gap-3 text-zinc-600">
                  {work.completed ? "Completed" : "In progress"}
                  {!readOnly && (
                    <button
                      onClick={() => onUpdateWork(student.studentId, work.id, { completed: !work.completed, notes: work.notes || "" })}
                      className="font-semibold text-zinc-900 underline"
                    >
                      Mark {work.completed ? "incomplete" : "complete"}
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        ) : <p className="mt-2 text-sm text-zinc-500">No projects or assignments recorded yet.</p>}
      </div>

      {!readOnly && (
        <form onSubmit={saveWork} className="mt-5 grid gap-3 border-t border-zinc-100 pt-5 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
          <label className="text-sm font-medium">Add work record
            <select value={workType} onChange={(e) => setWorkType(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2.5">
              <option value="PROJECT">Project</option><option value="ASSIGNMENT">Assignment</option>
            </select>
          </label>
          <label className="text-sm font-medium">Title
            <input required maxLength={160} value={workTitle} onChange={(e) => setWorkTitle(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2.5" />
          </label>
          <label className="flex items-center gap-2 pb-2 text-sm">
            <input type="checkbox" checked={workCompleted} onChange={(e) => setWorkCompleted(e.target.checked)} /> Completed
          </label>
          <button className="rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white">Save record</button>
        </form>
      )}
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    </section>
  );
}

export default function PortalDashboardPage() {
  const navigate = useNavigate();
  const session = getAdminSession();
  const role = session?.user?.role;
  const [items, setItems] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classroomId, setClassroomId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProgress = async (classId = classroomId) => {
    setLoading(true);
    setError("");
    try {
      let result = [];
      if (role === "STUDENT") {
        const student = await getStudentProgress();
        result = student ? [student] : [];
      } else if (role === "PARENT") {
        result = await getParentProgress();
      } else if (role === "PRINCIPAL") {
        result = await getPrincipalProgress();
      } else if (role === "TEACHER" && classId) {
        result = await getTeacherClassProgress(classId);
      }
      setItems(result);
    } catch (e) {
      setError(e.response?.data?.message || "Could not load learning progress.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      if (role === "TEACHER") {
        try {
          const assigned = await getTeacherClasses();
          setClasses(assigned);
          const firstId = assigned[0]?.id ? String(assigned[0].id) : "";
          setClassroomId(firstId);
          await loadProgress(firstId);
        } catch (e) {
          setError(e.response?.data?.message || "Could not load assigned classrooms.");
          setLoading(false);
        }
      } else {
        await loadProgress("");
      }
    };
    initialize();
  }, [role]);

  const handleMutation = async (mutation) => {
    await mutation();
    await loadProgress();
  };
  const handleLessonUpdate = (studentId, lessonId, payload) =>
    handleMutation(() => updateStudentLesson(studentId, lessonId, payload));
  const handleWorkUpdate = (studentId, workId, payload) =>
    handleMutation(() => updateStudentWork(studentId, workId, payload));
  const handleWorkCreate = (studentId, payload) =>
    handleMutation(() => recordStudentWork(studentId, payload));

  const logout = () => {
    clearAdminSession();
    navigate("/portal/login", { replace: true });
  };

  const title = {
    STUDENT: "My Learning Progress",
    PARENT: "Your Children's Progress",
    TEACHER: "Class Progress",
    PRINCIPAL: "School Progress",
  }[role] || "Learning Portal";

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">LEARNING PORTAL · {role}</p>
            <h1 className="mt-1 text-2xl font-bold">{title}</h1>
          </div>
          <div className="text-right">
            <p className="hidden text-sm text-zinc-600 sm:block">{session?.user?.email}</p>
            <button onClick={logout} className="mt-1 text-sm font-semibold text-zinc-800 underline">Sign out</button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl space-y-5 px-5 py-8">
        {role === "TEACHER" && (
          <label className="block max-w-lg text-sm font-medium">Assigned classroom
            <select value={classroomId} onChange={(e) => { setClassroomId(e.target.value); loadProgress(e.target.value); }} className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5">
              {classes.map((classroom) => <option key={classroom.id} value={classroom.id}>{classroom.name} — {classroom.schoolName} ({classroom.academicYear})</option>)}
            </select>
          </label>
        )}
        {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {loading ? <p role="status" className="text-zinc-500">Loading progress…</p> : (
          items.length ? items.map((student) => (
            <ProgressCard
              key={student.studentId}
              student={student}
              readOnly={role !== "TEACHER"}
              onUpdateLesson={handleLessonUpdate}
              onUpdateWork={handleWorkUpdate}
              onRecordWork={handleWorkCreate}
            />
          )) : (
            <section className={panelClass}>
              <h2 className="font-semibold">{role === "TEACHER" ? "No students in this classroom yet." : "No learning progress is available yet."}</h2>
              <p className="mt-2 text-sm text-zinc-600">
                {role === "PARENT" ? "Ask your school administrator to link your account to a student." :
                  role === "TEACHER" ? "Ask an administrator to assign students to this classroom." :
                    role === "STUDENT" ? "Ask your school administrator to assign you to a classroom." :
                      "Ask an administrator to assign your account to a school."}
              </p>
            </section>
          )
        )}
      </div>
    </main>
  );
}
