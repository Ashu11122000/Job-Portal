import axiosInstance from "./axiosInstance";

// ✅ GET ALL JOBS (PUBLIC)
export const getAllJobs = () => {
  return axiosInstance.get("/jobs");
};

// ✅ GET SINGLE JOB
export const getJobById = (id) => {
  return axiosInstance.get(`/jobs/${id}`);
};

// ✅ CREATE JOB (Recruiter/Admin)
export const createJob = (jobData) => {
  return axiosInstance.post("/jobs", jobData);
};

// ✅ UPDATE JOB
export const updateJob = (id, jobData) => {
  return axiosInstance.put(`/jobs/${id}`, jobData);
};

// ✅ DELETE JOB
export const deleteJob = (id) => {
  return axiosInstance.delete(`/jobs/${id}`);
};
