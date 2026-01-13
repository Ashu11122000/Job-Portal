import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://job-portal-production-2c0d.up.railway.app/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * ✅ Attach JWT token to every request
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 🔥 MUST EXIST
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ✅ Clean global error logger
 */
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("❌ API Error:", {
      method: err.config?.method,
      url: `${API_BASE_URL}${err.config?.url}`,
      status: err.response?.status,
      message: err.response?.data || err.message,
    });

    // Optional: auto logout on token expiry
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
