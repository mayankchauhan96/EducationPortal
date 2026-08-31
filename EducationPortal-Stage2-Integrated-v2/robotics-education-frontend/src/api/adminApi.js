import apiClient from "./apiClient";

const unwrap = (response) => response.data.data;

export async function loginAdmin(payload) {
  return unwrap(await apiClient.post("/auth/login", payload));
}

export async function getDashboard() {
  return unwrap(await apiClient.get("/admin/dashboard"));
}

export async function getAdminPrograms() {
  return unwrap(await apiClient.get("/admin/programs"));
}
export async function createProgram(payload) {
  return unwrap(await apiClient.post("/admin/programs", payload));
}
export async function updateProgram(id, payload) {
  return unwrap(await apiClient.put(`/admin/programs/${id}`, payload));
}
export async function deleteProgram(id) {
  return unwrap(await apiClient.delete(`/admin/programs/${id}`));
}

export async function getAdminProjects() {
  return unwrap(await apiClient.get("/admin/projects"));
}
export async function createProject(payload) {
  return unwrap(await apiClient.post("/admin/projects", payload));
}
export async function updateProject(id, payload) {
  return unwrap(await apiClient.put(`/admin/projects/${id}`, payload));
}
export async function deleteProject(id) {
  return unwrap(await apiClient.delete(`/admin/projects/${id}`));
}

export async function getAdminCurriculum() {
  return unwrap(await apiClient.get("/admin/curriculum"));
}
export async function createCurriculum(payload) {
  return unwrap(await apiClient.post("/admin/curriculum", payload));
}
export async function updateCurriculum(id, payload) {
  return unwrap(await apiClient.put(`/admin/curriculum/${id}`, payload));
}
export async function deleteCurriculum(id) {
  return unwrap(await apiClient.delete(`/admin/curriculum/${id}`));
}

export async function getAdminPageContent() {
  return unwrap(await apiClient.get("/admin/page-content"));
}
export async function createPageContent(payload) {
  return unwrap(await apiClient.post("/admin/page-content", payload));
}
export async function updatePageContent(id, payload) {
  return unwrap(await apiClient.put(`/admin/page-content/${id}`, payload));
}
export async function deletePageContent(id) {
  return unwrap(await apiClient.delete(`/admin/page-content/${id}`));
}

export async function getContacts() {
  return unwrap(await apiClient.get("/admin/contacts"));
}
export async function updateContactStatus(id, value) {
  return unwrap(await apiClient.patch(`/admin/contacts/${id}/status`, null, { params: { value } }));
}

export async function getDemoRequests() {
  return unwrap(await apiClient.get("/admin/demo-requests"));
}
export async function updateDemoStatus(id, value) {
  return unwrap(await apiClient.patch(`/admin/demo-requests/${id}/status`, null, { params: { value } }));
}

export async function getAdminUsers() {
  return unwrap(await apiClient.get("/admin/users"));
}
export async function createAdminUser(payload) {
  return unwrap(await apiClient.post("/admin/users", payload));
}
export async function setAdminUserActive(id, value) {
  return unwrap(await apiClient.patch(`/admin/users/${id}/active`, null, { params: { value } }));
}
