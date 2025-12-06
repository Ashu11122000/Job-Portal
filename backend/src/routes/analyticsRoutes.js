import express from "express";
import * as analyticsController from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Protected routes - admin only
router.get("/", protect, authorizeRoles("admin"), analyticsController.getAnalytics);
router.get("/jobs", protect, authorizeRoles("admin"), analyticsController.getJobStats);
router.get("/applications", protect, authorizeRoles("admin"), analyticsController.getApplicationStats);

export default router;
