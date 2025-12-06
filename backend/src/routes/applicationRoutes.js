import express from "express";
import * as applicationController from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, authorizeRoles("candidate"), applicationController.submitApplication);
router.get("/", protect, applicationController.getApplications);
router.get("/:id", protect, applicationController.getApplicationById);
router.put("/:id/status", protect, authorizeRoles("recruiter", "admin"), applicationController.updateApplicationStatus);
router.delete("/:id", protect, applicationController.deleteApplication);

export default router;
