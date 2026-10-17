import { useEffect, useState } from "react";
import { getAdminCurriculum } from "../../api/adminApi";
import {
  createAcademicClassroom,
  createAcademicSchool,
  getAcademicClassrooms,
  getAcademicSchools,
  getAcademicUsers,
  setAcademicPlacement,
  setParentStudents,
} from "../../api/learningApi";

const inputClass = "mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2.5";

export default function AdminAcademicSetupPage() {
  const [schools, setSchools] = useState([]);
  const [curricula, setCurricula] = useState([]);
  const [users, setUsers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [schoolName, setSchoolName] = useState("");
  const [classForm, setClassForm] = useState({ schoolId: "", curriculumId: "", name: "", academicYear: "" });
  const [selectedUserId, setSelectedUserId] = useState("");
  const [placementSchoolId, setPlacementSchoolId] = useState("");
  const [placementClassroomIds, setPlacementClassroomIds] = useState([]);
  const [childIds, setChildIds] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [nextSchools, nextCurricula, nextUsers] = await Promise.all([
        getAcademicSchools(),
        getAdminCurriculum(),
        getAcademicUsers(),
      ]);
      setSchools(nextSchools);
      setCurricula(nextCurricula);
      setUsers(nextUsers);
      setSelectedUserId((current) => current || String(nextUsers[0]?.id || ""));
      setClassForm((current) => ({
        ...current,
        schoolId: current.schoolId || String(nextSchools[0]?.id || ""),
        curriculumId: current.curriculumId || String(nextCurricula[0]?.id || ""),
      }));
    } catch (e) {
      setError(e.response?.data?.message || "Could not load academic setup.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const loadClasses = async () => {
      if (!placementSchoolId) {
        setClassrooms([]);
        return;
      }
      try {
        setClassrooms(await getAcademicClassrooms(placementSchoolId));
      } catch (e) {
        setError(e.response?.data?.message || "Could not load classrooms.");
      }
    };
    loadClasses();
  }, [placementSchoolId]);

  useEffect(() => {
    const user = users.find((item) => String(item.id) === selectedUserId);
    if (!user) return;
    setPlacementSchoolId(String(user.principalSchoolId || user.classroomSchoolId || ""));
    setPlacementClassroomIds(user.classroomIds.map(String));
    setChildIds(user.linkedStudentIds.map(String));
  }, [selectedUserId, users]);

  const submitSchool = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    try {
      await createAcademicSchool({ name: schoolName });
      setSchoolName("");
      setNotice("School created.");
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not create school.");
    }
  };

  const submitClassroom = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    try {
      await createAcademicClassroom({
        ...classForm,
        schoolId: Number(classForm.schoolId),
        curriculumId: Number(classForm.curriculumId),
      });
      setClassForm((current) => ({ ...current, name: "", academicYear: "" }));
      setNotice("Classroom created.");
    } catch (e) {
      setError(e.response?.data?.message || "Could not create classroom.");
    }
  };

  const submitPlacement = async (event) => {
    event.preventDefault();
    const user = users.find((item) => String(item.id) === selectedUserId);
    if (!user) return;
    setError("");
    setNotice("");
    try {
      if (user.role === "PARENT") {
        await setParentStudents(user.id, childIds.map(Number));
      } else {
        await setAcademicPlacement(user.id, {
          schoolId: placementSchoolId ? Number(placementSchoolId) : null,
          classroomIds: placementClassroomIds.map(Number),
        });
      }
      setNotice("Account placement saved.");
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not save account placement.");
    }
  };

  const selectedUser = users.find((item) => String(item.id) === selectedUserId);
  const eligibleStudents = users.filter((item) => item.role === "STUDENT");
  const updateSelectedClasses = (event) => {
    const values = Array.from(event.target.selectedOptions, (option) => option.value);
    setPlacementClassroomIds(values);
  };

  return (
    <div className="p-5 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">LEARNING PORTAL</p>
        <h1 className="section-title">Academic Setup</h1>
        <p className="mt-2 text-zinc-600">Create schools and classrooms, then assign portal accounts to the appropriate learning groups.</p>
        {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="mt-5 rounded-xl bg-zinc-100 p-4 text-sm text-zinc-800">{notice}</p>}
        {loading ? <p className="mt-8 text-zinc-500" role="status">Loading academic setup…</p> : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-zinc-200 bg-white p-6">
              <h2 className="text-xl font-bold">Schools</h2>
              <form onSubmit={submitSchool} className="mt-4 flex flex-col gap-3 sm:flex-row">
                <label className="flex-1 text-sm font-medium">School name <span className="text-red-600">*</span>
                  <input required maxLength={160} value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className={inputClass} />
                </label>
                <button className="btn-primary self-end">Add school</button>
              </form>
              <ul className="mt-5 divide-y divide-zinc-100">
                {schools.map((school) => <li key={school.id} className="py-3 text-sm">{school.name}{!school.active && <span className="ml-2 text-zinc-500">(inactive)</span>}</li>)}
                {!schools.length && <li className="py-3 text-sm text-zinc-500">No schools yet.</li>}
              </ul>
            </section>

            <section className="rounded-3xl border border-zinc-200 bg-white p-6">
              <h2 className="text-xl font-bold">Classrooms</h2>
              <form onSubmit={submitClassroom} className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-sm font-medium">School <span className="text-red-600">*</span>
                  <select required value={classForm.schoolId} onChange={(e) => setClassForm({ ...classForm, schoolId: e.target.value })} className={inputClass}>
                    <option value="">Select school</option>{schools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}
                  </select>
                </label>
                <label className="text-sm font-medium">Curriculum stage <span className="text-red-600">*</span>
                  <select required value={classForm.curriculumId} onChange={(e) => setClassForm({ ...classForm, curriculumId: e.target.value })} className={inputClass}>
                    <option value="">Select curriculum</option>{curricula.map((item) => <option key={item.id} value={item.id}>{item.levelName}</option>)}
                  </select>
                </label>
                <label className="text-sm font-medium">Classroom name <span className="text-red-600">*</span>
                  <input required maxLength={120} value={classForm.name} onChange={(e) => setClassForm({ ...classForm, name: e.target.value })} className={inputClass} />
                </label>
                <label className="text-sm font-medium">Academic year <span className="text-red-600">*</span>
                  <input required maxLength={20} placeholder="2025-2026" value={classForm.academicYear} onChange={(e) => setClassForm({ ...classForm, academicYear: e.target.value })} className={inputClass} />
                </label>
                <button disabled={!schools.length || !curricula.length} className="btn-primary sm:col-span-2 disabled:opacity-50">Add classroom</button>
              </form>
            </section>

            <section className="rounded-3xl border border-zinc-200 bg-white p-6 lg:col-span-2">
              <h2 className="text-xl font-bold">Account placement</h2>
              <p className="mt-1 text-sm text-zinc-500">Create accounts first in User Accounts. Students belong to one classroom; teachers may be assigned to multiple classrooms.</p>
              {!users.length ? <p className="mt-5 text-sm text-zinc-600">No student, parent, teacher, or principal accounts are available to assign.</p> : (
                <form onSubmit={submitPlacement} className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-medium">Account <span className="text-red-600">*</span>
                    <select required value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} className={inputClass}>
                      {users.map((user) => <option key={user.id} value={user.id}>{user.email} — {user.role}</option>)}
                    </select>
                  </label>
                  {selectedUser?.role === "PARENT" ? (
                    <label className="text-sm font-medium">Linked students
                      <select multiple value={childIds} onChange={(e) => setChildIds(Array.from(e.target.selectedOptions, (option) => option.value))} className={`${inputClass} min-h-32`}>
                        {eligibleStudents.map((student) => <option key={student.id} value={student.id}>{student.email}</option>)}
                      </select>
                      <span className="mt-1 block font-normal text-zinc-500">Use Ctrl or Command to select multiple students.</span>
                    </label>
                  ) : (
                    <>
                      <label className="text-sm font-medium">School <span className="text-red-600">*</span>
                        <select required value={placementSchoolId} onChange={(e) => { setPlacementSchoolId(e.target.value); setPlacementClassroomIds([]); }} className={inputClass}>
                          <option value="">Select school</option>{schools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}
                        </select>
                      </label>
                      {selectedUser?.role !== "PRINCIPAL" && (
                        <label className="text-sm font-medium md:col-span-2">Classrooms <span className="text-red-600">*</span>
                          <select required multiple={selectedUser?.role === "TEACHER"} value={placementClassroomIds} onChange={updateSelectedClasses} className={`${inputClass} ${selectedUser?.role === "TEACHER" ? "min-h-32" : ""}`}>
                            {classrooms.map((classroom) => <option key={classroom.id} value={classroom.id}>{classroom.name} — {classroom.curriculumName} ({classroom.academicYear})</option>)}
                          </select>
                          {selectedUser?.role === "TEACHER" && <span className="mt-1 block font-normal text-zinc-500">Use Ctrl or Command to select multiple classrooms.</span>}
                        </label>
                      )}
                    </>
                  )}
                  <button className="btn-primary md:col-span-2">Save placement</button>
                </form>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
