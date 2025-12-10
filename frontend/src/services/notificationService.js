import axiosInstance from "../api/axiosInstance";

export const getNotifications = () => axiosInstance.get("/notifications");

export const markAsRead = (id) =>
  axiosInstance.put(`/notifications/${id}/read`);
