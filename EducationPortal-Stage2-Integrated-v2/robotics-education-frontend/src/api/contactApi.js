import apiClient from "./apiClient";

export const submitContact = async (payload) => {
  const response = await apiClient.post("/contact", payload);
  return response.data;
};
