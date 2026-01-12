import express from "express";

// ================= CORE JOB CONTROLLERS =================
import { getJob, getJobs, updateJob, deleteJob } from "../controllers/jobs/jobList.js";
import { createJob } from "../controllers/jobs/jobCreate.js";

// ================= COMPANY / PHASE 3 SERVICES =================
import {
  insertJobByCompany,
  fetchJobsByCompany,
  assignCompanyRelationInJobs,
} from "../services/companyService.js";

import { getJobsByCompany } from "../controllers/company/jobListByCompany.js";

// ================= ANALYTICS & INTERACTIONS =================
import { incrementViews } from "../controllers/jobs/viewIncrement.js";
import { shortlistCandidate } from "../controllers/applications/shortlist.js";
import { sendOfferLetter } from "../controllers/applications/offerLetter.js";
import { recruiterAnalytics } from "../controllers/analytics/recruiterAnalytics.js";
import { salaryAnalytics } from "../controllers/jobs/salaryAnalytics.js";

// ===========================================================

const router = express.Router();

/**
 * GET all jobs
 */
router.get("/", async (req, res) => {
  try {
    const jobs = await getJobs();
    res.json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch jobs", error: err.message });
  }
});

/**
 * GET job by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const job = await getJob(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch job", error: err.message });
  }
});

/**
 * CREATE job  ✅ FIXED (controller-based)
 */
router.post("/", createJob);

/**
 * UPDATE job
 */
router.put("/:id", async (req, res) => {
  try {
    const job = await updateJob(req.params.id, req.body);
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update job", error: err.message });
  }
});

/**
 * DELETE job
 */
router.delete("/:id", async (req, res) => {
  try {
    await deleteJob(req.params.id);
    res.json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete job", error: err.message });
  }
});

// ================= COMPANY-BASED JOB ROUTES =================

router.get("/company/:companyId", async (req, res) => {
  try {
    const jobs = await fetchJobsByCompany(req.params.companyId);
    res.json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load company jobs", error: err.message });
  }
});

// Alias (kept for backward compatibility)
router.get("/company/:id/jobs", async (req, res) => {
  try {
    const jobs = await fetchJobsByCompany(req.params.id);
    res.json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch jobs by company", error: err.message });
  }
});

// ================= PHASE 3 / MAINTENANCE =================

router.post("/assign/company", async (req, res) => {
  try {
    const result = await insertJobByCompany(req.body);
    res.status(201).json({
      success: true,
      message: "Job assigned to company successfully",
      jobId: result.insertId,
      company_id: req.body.company_id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to assign job to company", error: err.message });
  }
});

router.get("/jobs/analytics", async (req, res) => {
  try {
    const jobs = await assignCompanyRelationInJobs();
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch analytics jobs", error: err.message });
  }
});

// ================= INTERACTIONS & ANALYTICS =================

router.put("/views/:id", incrementViews);
router.put("/applications/shortlist/:id", shortlistCandidate);
router.put("/applications/offer/:id", sendOfferLetter);
router.get("/recruiter/:id/analytics", recruiterAnalytics);
router.get("/analytics/salary/:recruiterId", salaryAnalytics);

// ===========================================================

export default router;
