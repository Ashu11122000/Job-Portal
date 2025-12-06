import Job from "../models/Job.js";
import ErrorResponse from "../utils/errorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import catchAsync from "../utils/catchAsync.js";

// 🧱 Create a new job (Recruiter/Admin)
export const createJob = catchAsync(async (req, res, next) => {
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
    createdBy: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, newJob, "Job created successfully"));
});

// 📜 Get all jobs (Public)
export const getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find().populate("company createdBy", "name email");
  res.status(200).json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});

// 🔍 Get single job by ID (Public)
export const getJobById = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id).populate(
    "company createdBy",
    "name email"
  );
  if (!job) return next(new ErrorResponse("Job not found", 404));
  res.status(200).json(new ApiResponse(200, job, "Job fetched successfully"));
});

// ✏️ Update job (Recruiter/Admin)
export const updateJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) return next(new ErrorResponse("Job not found", 404));

  if (
    job.createdBy.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  Object.assign(job, req.body);
  await job.save();

  res.status(200).json(new ApiResponse(200, job, "Job updated successfully"));
});

// 🗑️ Delete job (Recruiter/Admin)
export const deleteJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) return next(new ErrorResponse("Job not found", 404));

  if (
    job.createdBy.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  await job.deleteOne();
  res.status(200).json(new ApiResponse(200, null, "Job deleted successfully"));
});
