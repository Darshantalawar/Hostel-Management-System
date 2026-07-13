import axios from "axios";

// Single source of truth for the backend base URL.
export const API_BASE_URL = "http://localhost:8083";

const api = axios.create({
  baseURL: API_BASE_URL
});

// Attach the JWT (if we have one) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// If the backend ever says our token is invalid/expired, force a clean
// logout instead of leaving the user stuck on a broken page.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const role = localStorage.getItem("role");

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("student");
      localStorage.removeItem("admin");

      if (role === "ADMIN") {
        window.location.href = "/admin/login";
      } else if (role === "STUDENT") {
        window.location.href = "/student/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
