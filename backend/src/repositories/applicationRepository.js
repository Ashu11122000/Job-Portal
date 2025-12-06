// Application Repository - data access layer for applications
import Application from "../models/Application.js";

export const findAllApplications = async (filters = {}) => {
  return await Application.find(filters)
    .populate("job candidate")
    .sort({ createdAt: -1 });
};

export const findApplicationById = async (id) => {
  return await Application.findById(id).populate("job candidate");
};

export const createApplication = async (applicationData) => {
  return await Application.create(applicationData);
};

export const updateApplication = async (id, applicationData) => {
  return await Application.findByIdAndUpdate(id, applicationData, { new: true });
};

export const deleteApplication = async (id) => {
  return await Application.findByIdAndDelete(id);
};
