import apiClient from "./apiClient";

export const getPrograms = async () => {
  const response = await apiClient.get("/programs");
  return response.data.data;
};

export const getProgramBySlug = async (slug) => {
  const response = await apiClient.get(`/programs/${slug}`);
  return response.data.data;
};