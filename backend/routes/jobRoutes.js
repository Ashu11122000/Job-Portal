import express from "express";
import { getJob, getJobs, createJob, updateJob, deleteJob } from "../controllers/jobs/jobList.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const jobs = await getJobs();
  res.json({ success: true, data: jobs });
});

router.get("/:id", async (req, res) => {
  const job = await getJob(req.params.id);
  if (!job) return res.status(404).json({ success: false, message: "Job not found" });
  res.json({ success: true, data: job });
});

router.post("/", async (req, res) => {
  try {
    const job = await createJob(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create job" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const job = await updateJob(req.params.id, req.body);
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update job" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteJob(req.params.id);
    res.json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete job" });
  }
});

export default router;
