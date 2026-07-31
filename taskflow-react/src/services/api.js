import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor — runs before EVERY request, attaches the token if one exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor — runs on EVERY response; if the token is invalid/expired, force logout
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const signup = (userData) => apiClient.post("/auth/signup", userData);
export const login = (credentials) =>
  apiClient.post("/auth/login", credentials);

export const fetchTasks = () => apiClient.get("/tasks");
export const createTask = (taskData) => apiClient.post("/tasks", taskData);
export const updateTaskStatus = (taskId, status) =>
  apiClient.patch(`/tasks/${taskId}/status`, { status });
export const deleteTaskById = (taskId) => apiClient.delete(`/tasks/${taskId}`);

export default apiClient;
