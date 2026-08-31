import apiClient from "./apiClient";

export const getPageContent = async (pageKey) => {
  const response = await apiClient.get(`/pages/${pageKey}`);
  return response.data.data || [];
};
