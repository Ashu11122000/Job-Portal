// src/api/applicationApi.js
import axiosInstance from "./axiosInstance";

/* ================= BASIC APIS ================= */

export const applyForJob = (payload) =>
  axiosInstance.post("/applications", payload);
// payload: { jobId, coverLetter }

export const getApplications = () =>
  axiosInstance.get("/applications");

export const getApplicationById = (id) =>
  axiosInstance.get(`/applications/${id}`);

export const updateApplicationStatus = (id, status) =>
  axiosInstance.put(`/applications/${id}/status`, { status });

export const deleteApplication = (id) =>
  axiosInstance.delete(`/applications/${id}`);

/* ================= CANDIDATE / RECRUITER ================= */

/**
 * ✅ Candidate / Recruiter applications
 * GET /api/applications/user/:userId
 */
export const getMyApplications = (userId) =>
  axiosInstance.get(`/applications/user/${userId}`);
