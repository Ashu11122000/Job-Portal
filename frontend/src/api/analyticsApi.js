import axiosInstance from "./axiosInstance";

export const getAnalyticsSummary = () => axiosInstance.get("/analytics");
export const getJobStats = () => axiosInstance.get("/analytics/jobs");
export const getApplicationStats = () =>
  axiosInstance.get("/analytics/applications");
