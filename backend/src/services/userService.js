// User Service - handles user business logic
import User from "../models/User.js";

export const getUserById = async (userId) => {
  try {
    return await User.findById(userId).select("-password");
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, updateData) => {
  try {
    return await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
};
