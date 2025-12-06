import express from "express";
import * as userController from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/profile", protect, userController.getUserProfile);
router.put("/profile", protect, userController.updateUserProfile);
router.get("/", protect, authorizeRoles("admin"), userController.getAllUsers);

export default router;
