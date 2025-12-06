// Application Controller - handles application-related requests
import ApiResponse from "../utils/apiResponse.js";
import ErrorResponse from "../utils/errorResponse.js";
import catchAsync from "../utils/catchAsync.js";
import * as applicationRepo from "../repositories/applicationRepository.js";

export const submitApplication = catchAsync(async (req, res, next) => {
  const { jobId, coverLetter } = req.body;

  const application = await applicationRepo.createApplication({
    job: jobId,
    candidate: req.user._id,
    coverLetter,
  });

  res
    .status(201)
    .json(new ApiResponse(201, application, "Application submitted successfully"));
});

export const getApplications = catchAsync(async (req, res, next) => {
  const filters = req.user.role === "recruiter" 
    ? { "job.createdBy": req.user._id } 
    : { candidate: req.user._id };

  const applications = await applicationRepo.findAllApplications(filters);
  res
    .status(200)
    .json(new ApiResponse(200, applications, "Applications fetched successfully"));
});

export const getApplicationById = catchAsync(async (req, res, next) => {
  const application = await applicationRepo.findApplicationById(req.params.id);
  if (!application) {
    return next(new ErrorResponse("Application not found", 404));
  }
  res
    .status(200)
    .json(new ApiResponse(200, application, "Application fetched successfully"));
});

export const updateApplicationStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  let application = await applicationRepo.findApplicationById(req.params.id);
  if (!application) {
    return next(new ErrorResponse("Application not found", 404));
  }

  application = await applicationRepo.updateApplication(req.params.id, { status });
  res
    .status(200)
    .json(new ApiResponse(200, application, "Application status updated successfully"));
});

export const deleteApplication = catchAsync(async (req, res, next) => {
  const application = await applicationRepo.findApplicationById(req.params.id);
  if (!application) {
    return next(new ErrorResponse("Application not found", 404));
  }

  await applicationRepo.deleteApplication(req.params.id);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Application deleted successfully"));
});
