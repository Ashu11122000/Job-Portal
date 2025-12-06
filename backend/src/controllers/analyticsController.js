// Analytics Controller - handles analytics-related requests
import ApiResponse from "../utils/apiResponse.js";
import ErrorResponse from "../utils/errorResponse.js";
import catchAsync from "../utils/catchAsync.js";
import * as analyticsService from "../services/analyticsService.js";

export const getAnalytics = catchAsync(async (req, res, next) => {
  const jobStats = await analyticsService.getJobStats();
  const applicationStats = await analyticsService.getApplicationStats();
  const userStats = await analyticsService.getUserStats();

  res.status(200).json(
    new ApiResponse(
      200,
      { jobStats, applicationStats, userStats },
      "Analytics fetched successfully"
    )
  );
});

export const getJobStats = catchAsync(async (req, res, next) => {
  const stats = await analyticsService.getJobStats();
  res
    .status(200)
    .json(new ApiResponse(200, stats, "Job statistics fetched successfully"));
});

export const getApplicationStats = catchAsync(async (req, res, next) => {
  const stats = await analyticsService.getApplicationStats();
  res
    .status(200)
    .json(new ApiResponse(200, stats, "Application statistics fetched successfully"));
});
