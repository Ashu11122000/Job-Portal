// routes/resumeRoutes.js
import express from "express";

import { saveResume } from "../controllers/resume/saveResume.js";
import { getResumeById } from "../controllers/resume/getResumeById.js";
import { listResumes } from "../controllers/resume/listResumes.js";

const router = express.Router();

/**
 * ✅ ORDER MATTERS
 * Always keep "/" BEFORE "/:id"
 */

// GET  /api/resume        → list resumes
router.get("/", listResumes);

// GET  /api/resume/:id    → get resume by id
router.get("/:id", getResumeById);

// POST /api/resume        → save resume
router.post("/", saveResume);

export default router;
