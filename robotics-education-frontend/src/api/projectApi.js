import apiClient from "./apiClient";

export const getProjects = async () => {
  const response = await apiClient.get("/projects");
  return response.data.data || [];
};

export const getProjectBySlug = async (slug) => {
  const response = await apiClient.get(`/projects/${slug}`);
  return response.data.data;
};
