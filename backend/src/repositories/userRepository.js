// User Repository - data access layer for users
import User from "../models/User.js";

export const findUserById = async (id) => {
  return await User.findById(id).select("-password");
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true }).select("-password");
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
