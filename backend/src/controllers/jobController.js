import Job from "../models/Job.js";
import ApiError from "../utils/errorResponse.js";
import ApiResponse from "../utils/apiResponse.js";

// 🧱 Create a new job (Recruiter/Admin)
export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salaryRange,
      jobType,
      experienceLevel,
    } = req.body;

    const newJob = await Job.create({
      title,
      description,
      company,
      location,
      salaryRange,
      jobType,
      experienceLevel,
      createdBy: req.user._id, // from JWT
    });

    res
      .status(201)
      .json(new ApiResponse(201, newJob, "Job created successfully"));
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

// 📜 Get all jobs (Public)
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("company createdBy", "name email");
    res
      .status(200)
      .json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

// 🔍 Get single job by ID (Public)
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "company createdBy",
      "name email"
    );
    if (!job) return next(new ApiError(404, "Job not found"));
    res.status(200).json(new ApiResponse(200, job, "Job fetched successfully"));
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

// ✏️ Update job (Recruiter/Admin)
export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return next(new ApiError(404, "Job not found"));

    // Only the creator or admin can edit
    if (
      job.createdBy.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return next(new ApiError(403, "Not authorized"));
    }

    Object.assign(job, req.body);
    await job.save();

    res.status(200).json(new ApiResponse(200, job, "Job updated successfully"));
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

// 🗑️ Delete job (Recruiter/Admin)
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return next(new ApiError(404, "Job not found"));

    // Only the creator or admin can delete
    if (
      job.createdBy.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return next(new ApiError(403, "Not authorized"));
    }

    await job.deleteOne();
    res
      .status(200)
      .json(new ApiResponse(200, null, "Job deleted successfully"));
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};
