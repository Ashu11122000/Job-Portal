// src/api/applicationApi.js
import axiosInstance from "./axiosInstance";

/* ================= APPLY JOB ================= */

/**
 * Apply for a job
 * POST /api/applications
 * payload: { jobId, userId, resume }
 */
export const applyForJob = (payload) => {
  return axiosInstance.post("/applications", payload);
};

/* ================= FETCH APPLICATIONS ================= */

/**
 * Get applications of a specific user (Candidate / Recruiter)
 * GET /api/applications/user/:userId
 */
export const getMyApplications = (userId) => {
  return axiosInstance.get(`/applications/user/${userId}`);
};

/* ================= ADMIN / RECRUITER ================= */

/**
 * (Optional future use)
 * Get all applications
 * GET /api/applications
 * ⚠️ Backend route not implemented yet
 */
export const getAllApplications = () => {
  return axiosInstance.get("/applications");
};

/**
 * Delete an application
 * DELETE /api/applications/:id
 */
export const deleteApplication = (id) => {
  return axiosInstance.delete(`/applications/${id}`);
};

/* ================= PLACEHOLDERS (SAFE) ================= */

/**
 * ❌ Not implemented in backend yet
 * These are kept commented to avoid 404 errors
 */

// export const getApplicationById = (id) =>
//   axiosInstance.get(`/applications/${id}`);

// export const updateApplicationStatus = (id, status) =>
//   axiosInstance.put(`/applications/${id}/status`, { status });
