// User Controller - handles user-related requests
import ApiResponse from "../utils/apiResponse.js";
import ErrorResponse from "../utils/errorResponse.js";
import catchAsync from "../utils/catchAsync.js";
import * as userRepo from "../repositories/userRepository.js";
import User from "../models/User.js";

export const getUserProfile = catchAsync(async (req, res, next) => {
  const user = await userRepo.findUserById(req.user._id);
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

export const updateUserProfile = catchAsync(async (req, res, next) => {
  const allowedFields = ["name", "phone", "avatar", "skills", "resume"];
  const updateData = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  const user = await userRepo.updateUser(req.user._id, updateData);
  res
    .status(200)
    .json(new ApiResponse(200, user, "User profile updated successfully"));
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-password");
  res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
});
