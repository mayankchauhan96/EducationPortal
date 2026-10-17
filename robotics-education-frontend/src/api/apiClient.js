import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
console.log("API BASE URL:", apiBaseUrl);

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("admin_token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes("/auth/login") && (
      window.location.pathname.startsWith("/admin") ||
      window.location.pathname.startsWith("/portal")
    )) {
      sessionStorage.removeItem("admin_token");
      sessionStorage.removeItem("admin_user");
      window.location.href = window.location.pathname.startsWith("/portal") ? "/portal/login" : "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;