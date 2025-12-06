// Notification Service - handles notifications
import Notification from "../models/Notification.js";

export const createNotification = async (notificationData) => {
  try {
    return await Notification.create(notificationData);
  } catch (error) {
    throw error;
  }
};

export const getNotifications = async (userId) => {
  try {
    return await Notification.find({ user: userId }).sort({ createdAt: -1 });
  } catch (error) {
    throw error;
  }
};

export const markAsRead = async (notificationId) => {
  try {
    return await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};
