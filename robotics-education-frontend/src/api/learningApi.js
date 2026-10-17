import apiClient from "./apiClient";

const unwrap = (response) => response.data.data;

export const getAcademicSchools = async () => unwrap(await apiClient.get("/admin/academic/schools"));
export const createAcademicSchool = async (payload) => unwrap(await apiClient.post("/admin/academic/schools", payload));
export const getAcademicClassrooms = async (schoolId) => unwrap(await apiClient.get("/admin/academic/classrooms", { params: { schoolId } }));
export const createAcademicClassroom = async (payload) => unwrap(await apiClient.post("/admin/academic/classrooms", payload));
export const getAcademicUsers = async () => unwrap(await apiClient.get("/admin/academic/users"));
export const setAcademicPlacement = async (userId, payload) => unwrap(await apiClient.put(`/admin/academic/users/${userId}/placement`, payload));
export const setParentStudents = async (userId, studentIds) => unwrap(await apiClient.put(`/admin/academic/users/${userId}/children`, { studentIds }));

export const getCurriculumLessons = async (curriculumId) => unwrap(await apiClient.get(`/admin/curriculum/${curriculumId}/lessons`));
export const createCurriculumLesson = async (curriculumId, payload) => unwrap(await apiClient.post(`/admin/curriculum/${curriculumId}/lessons`, payload));
export const updateCurriculumLesson = async (curriculumId, lessonId, payload) => unwrap(await apiClient.put(`/admin/curriculum/${curriculumId}/lessons/${lessonId}`, payload));
export const deleteCurriculumLesson = async (curriculumId, lessonId) => unwrap(await apiClient.delete(`/admin/curriculum/${curriculumId}/lessons/${lessonId}`));

export const getTeacherClasses = async () => unwrap(await apiClient.get("/teacher/classes"));
export const getTeacherClassProgress = async (classroomId) => unwrap(await apiClient.get(`/teacher/classes/${classroomId}/students`));
export const updateStudentLesson = async (studentId, lessonId, payload) => unwrap(await apiClient.patch(`/teacher/students/${studentId}/lessons/${lessonId}`, payload));
export const recordStudentWork = async (studentId, payload) => unwrap(await apiClient.post(`/teacher/students/${studentId}/work`, payload));
export const updateStudentWork = async (studentId, workId, payload) => unwrap(await apiClient.patch(`/teacher/students/${studentId}/work/${workId}`, payload));
export const getStudentProgress = async () => unwrap(await apiClient.get("/student/progress"));
export const getParentProgress = async () => unwrap(await apiClient.get("/parent/progress"));
export const getPrincipalProgress = async () => unwrap(await apiClient.get("/principal/progress"));
