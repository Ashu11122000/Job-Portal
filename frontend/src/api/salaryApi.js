import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getSalaryAnalytics = (recruiterId) =>
  axiosInstance.get(`/jobs/analytics/salary/${recruiterId}`);

export default axiosInstance;
