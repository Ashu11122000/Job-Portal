import axiosInstance from "./axiosInstance.js";

// Create interview session
export const createSessionApi = (data) => {
  return axiosInstance.post("/api/mock-interview/session", data);
};

// Get one session by ID
export const getSessionApi = (id) => {
  return axiosInstance.get(`/api/mock-interview/session/${id}`);
};

// List all sessions
export const listSessionsApi = () => {
  return axiosInstance.get("/api/mock-interview/session");
};

// Delete session
export const deleteSessionApi = (id) => {
  return axiosInstance.delete(`/api/mock-interview/session/${id}`);
};

// Get question by role, difficulty, index
export const getQuestionApi = (data) => {
  return axiosInstance.post("/api/mock-interview/question", data);
};

// Submit answers
export const submitAnswerApi = (data) => {
  return axiosInstance.post("/api/mock-interview/answer", data);
};

// Generate interview report
export const generateReportApi = (id) => {
  return axiosInstance.post(`/api/mock-interview/report/${id}`);
};
