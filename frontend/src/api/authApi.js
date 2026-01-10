import axiosInstance from "./axiosInstance";

export const registerUser = (payload) =>
  axiosInstance.post("/api/auth/register", payload);

export const loginUser = (payload) =>
  axiosInstance.post("/api/auth/login", payload);
