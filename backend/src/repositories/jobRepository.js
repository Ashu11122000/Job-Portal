// Job Repository - data access layer for jobs
import Job from "../models/Job.js";

export const findAllJobs = async (filters = {}) => {
  return await Job.find(filters).populate("company createdBy");
};

export const findJobById = async (id) => {
  return await Job.findById(id).populate("company createdBy");
};

export const createJob = async (jobData) => {
  return await Job.create(jobData);
};

export const updateJob = async (id, jobData) => {
  return await Job.findByIdAndUpdate(id, jobData, { new: true });
};

export const deleteJob = async (id) => {
  return await Job.findByIdAndDelete(id);
};
