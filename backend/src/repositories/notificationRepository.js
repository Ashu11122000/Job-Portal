// Notification Repository - data access layer for notifications
import Notification from "../models/Notification.js";

export const findAllNotifications = async (userId) => {
  return await Notification.find({ user: userId }).sort({ createdAt: -1 });
};

export const findNotificationById = async (id) => {
  return await Notification.findById(id);
};

export const createNotification = async (notificationData) => {
  return await Notification.create(notificationData);
};

export const updateNotification = async (id, notificationData) => {
  return await Notification.findByIdAndUpdate(id, notificationData, { new: true });
};

export const deleteNotification = async (id) => {
  return await Notification.findByIdAndDelete(id);
};
