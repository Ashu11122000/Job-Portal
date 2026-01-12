import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://job-portal-production-2c0d.up.railway.app/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 🔥 IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("❌ API Error:", {
      method: err.config?.method,
      url: `${API_BASE_URL}${err.config?.url}`,
      status: err.response?.status,
      message: err.response?.data || err.message,
    });
    return Promise.reject(err);
  }
);

export default axiosInstance;
