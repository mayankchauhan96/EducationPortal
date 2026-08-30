import apiClient from "./apiClient";

export const submitDemoRequest = async (payload) => {
  const response = await apiClient.post("/demo-requests", payload);
  return response.data;
};
