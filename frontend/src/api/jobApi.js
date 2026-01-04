import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getAllJobs = () => axiosInstance.get("/jobs");
export const getJobById = (id) => axiosInstance.get(`/jobs/${id}`);
export const createJob = (jobData) => axiosInstance.post("/jobs", jobData);
export const updateJob = (id, jobData) => axiosInstance.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => axiosInstance.delete(`/jobs/${id}`);
