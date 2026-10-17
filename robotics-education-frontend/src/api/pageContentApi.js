import apiClient from "./apiClient";

export const getPageContent = async (pageKey) => {
  const response = await apiClient.get(`/pages/${pageKey}`);
  return response.data.data || [];
};

export const getFeaturedTestimonials = async () => {
  const response = await apiClient.get("/pages/testimonials/featured");
  return response.data.data || [];
};
