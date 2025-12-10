import axiosInstance from "./axiosInstance";

export const applyForJob = (payload) =>
  axiosInstance.post("/applications", payload); // { jobId, coverLetter }

export const getApplications = () => axiosInstance.get("/applications");

export const getApplicationById = (id) =>
  axiosInstance.get(`/applications/${id}`);

export const updateApplicationStatus = (id, status) =>
  axiosInstance.put(`/applications/${id}/status`, { status });

export const deleteApplication = (id) =>
  axiosInstance.delete(`/applications/${id}`);
