import express from "express";
import * as notificationController from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/", protect, notificationController.getNotifications);
router.put("/:id/read", protect, notificationController.markAsRead);
router.delete("/:id", protect, notificationController.deleteNotification);

export default router;
