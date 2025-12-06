// Notification Controller - handles notification-related requests
import ApiResponse from "../utils/apiResponse.js";
import ErrorResponse from "../utils/errorResponse.js";
import catchAsync from "../utils/catchAsync.js";
import * as notificationRepo from "../repositories/notificationRepository.js";

export const getNotifications = catchAsync(async (req, res, next) => {
  const notifications = await notificationRepo.findAllNotifications(req.user._id);
  res
    .status(200)
    .json(new ApiResponse(200, notifications, "Notifications fetched successfully"));
});

export const markAsRead = catchAsync(async (req, res, next) => {
  const notification = await notificationRepo.updateNotification(req.params.id, {
    isRead: true,
  });

  if (!notification) {
    return next(new ErrorResponse("Notification not found", 404));
  }

  res
    .status(200)
    .json(new ApiResponse(200, notification, "Notification marked as read"));
});

export const deleteNotification = catchAsync(async (req, res, next) => {
  const notification = await notificationRepo.findNotificationById(req.params.id);
  if (!notification) {
    return next(new ErrorResponse("Notification not found", 404));
  }

  await notificationRepo.deleteNotification(req.params.id);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Notification deleted successfully"));
});
