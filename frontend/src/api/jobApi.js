import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ================= EXISTING APIS (UNCHANGED) ================= */
export const getAllJobs = () => axiosInstance.get("/jobs");
export const getJobById = (id) => axiosInstance.get(`/jobs/${id}`);
export const createJob = (jobData) => axiosInstance.post("/jobs", jobData);
export const updateJob = (id, jobData) => axiosInstance.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => axiosInstance.delete(`/jobs/${id}`);

/* ================= NEW APIS ADDED (WITHOUT REMOVING ANYTHING) ================= */

/**
 * 👁 Increment job views
 * PUT /api/jobs/views/:id
 */
export const incrementViews = (jobId) =>
  axiosInstance.put(`/jobs/views/${jobId}`);

/**
 * 📊 Get jobs posted by recruiter
 * GET /api/jobs/recruiter/:recruiterId
 * (optional helper if backend route exists)
 */
export const getJobsByRecruiter = (recruiterId) =>
  axiosInstance.get(`/jobs/recruiter/${recruiterId}`);

/**
 * 📈 Job analytics (company + job join)
 * GET /api/jobs/jobs/analytics
 */
export const getJobAnalytics = () =>
  axiosInstance.get("/jobs/jobs/analytics");
