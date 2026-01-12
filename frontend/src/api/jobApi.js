// src/api/jobApi.js
import axiosInstance from "./axiosInstance";

/* ================= EXISTING APIS ================= */

export const getAllJobs = () =>
  axiosInstance.get("/jobs");

export const getJobById = (id) =>
  axiosInstance.get(`/jobs/${id}`);

export const createJob = (jobData) =>
  axiosInstance.post("/jobs", jobData);

export const updateJob = (id, jobData) =>
  axiosInstance.put(`/jobs/${id}`, jobData);

export const deleteJob = (id) =>
  axiosInstance.delete(`/jobs/${id}`);

/* ================= ADDITIONAL / OPTIONAL ================= */

/**
 * 👁 Increment job views
 * PUT /api/jobs/views/:id
 */
export const incrementViews = (jobId) =>
  axiosInstance.put(`/jobs/views/${jobId}`);

/**
 * 📊 Jobs by recruiter
 * GET /api/jobs/recruiter/:recruiterId
 * (ONLY if backend supports it)
 */
export const getJobsByRecruiter = (recruiterId) =>
  axiosInstance.get(`/jobs/recruiter/${recruiterId}`);

/**
 * 📈 Job analytics
 * GET /api/jobs/analytics
 */
export const getJobAnalytics = () =>
  axiosInstance.get("/jobs/analytics");
