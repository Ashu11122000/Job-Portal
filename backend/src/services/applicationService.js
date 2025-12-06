// Application Service - handles application business logic
import Application from "../models/Application.js";

export const submitApplication = async (applicationData) => {
  try {
    return await Application.create(applicationData);
  } catch (error) {
    throw error;
  }
};

export const getApplications = async (filters = {}) => {
  try {
    return await Application.find(filters)
      .populate("job candidate")
      .sort({ createdAt: -1 });
  } catch (error) {
    throw error;
  }
};

export const updateApplicationStatus = async (applicationId, status) => {
  try {
    return await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};
