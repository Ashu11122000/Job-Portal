// Job Service - handles job business logic
import Job from "../models/Job.js";

export const getJobsFiltered = async (filters = {}) => {
  try {
    const query = Job.find(filters);
    return await query.populate("company createdBy");
  } catch (error) {
    throw error;
  }
};

export const createNewJob = async (jobData) => {
  try {
    return await Job.create(jobData);
  } catch (error) {
    throw error;
  }
};
