import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Protected routes
router.post("/", protect, authorizeRoles("recruiter", "admin"), createJob);
router.put("/:id", protect, authorizeRoles("recruiter", "admin"), updateJob);
router.delete("/:id", protect, authorizeRoles("recruiter", "admin"), deleteJob);

export default router;
