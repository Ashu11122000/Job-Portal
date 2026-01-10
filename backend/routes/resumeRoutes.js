import express from "express";
import { saveResume } from "../controllers/resume/saveResume.js";
import { getResumeById } from "../controllers/resume/getResumeById.js";
import { listResumes } from "../controllers/resume/listResumes.js";

const router = express.Router();

router.post("/", saveResume);              // POST  /api/resume
router.get("/:id", getResumeById);         // GET   /api/resume/:id
router.get("/", listResumes);              // GET   /api/resume

export default router;
