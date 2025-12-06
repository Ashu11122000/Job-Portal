// Analytics Service - handles analytics business logic
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";

export const getJobStats = async () => {
  try {
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ isActive: true });
    return { totalJobs, activeJobs };
  } catch (error) {
    throw error;
  }
};

export const getApplicationStats = async () => {
  try {
    const totalApplications = await Application.countDocuments();
    const statuses = await Application.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    return { totalApplications, statuses };
  } catch (error) {
    throw error;
  }
};

export const getUserStats = async () => {
  try {
    const totalUsers = await User.countDocuments();
    const roles = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);
    return { totalUsers, roles };
  } catch (error) {
    throw error;
  }
};
