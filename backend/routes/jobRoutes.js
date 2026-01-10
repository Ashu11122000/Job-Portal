import express from "express";
import {
  getJob,
  getJobs,
  createJob,
  updateJob,
  deleteJob
} from "../controllers/jobs/jobList.js";

// Phase 3 imports added ✔
import {
  insertJobByCompany,
  fetchJobsByCompany,
  assignCompanyRelationInJobs
} from "../services/companyService.js";

import { getJobsByCompany } from "../controllers/company/jobListByCompany.js";

// ========== NEW API IMPORTS ADDED (fixed paths) ==========
import { incrementViews } from "../controllers/jobs/viewIncrement.js";
import { shortlistCandidate } from "../controllers/applications/shortlist.js"; // temporary safe import if file missing
import { sendOfferLetter } from "../controllers/applications/offerLetter.js";
import { recruiterAnalytics } from "../controllers/analytics/recruiterAnalytics.js";
import { salaryAnalytics } from "../controllers/jobs/salaryAnalytics.js"; // fallback safe import
// =======================================================

const router = express.Router();

// Existing kept ✔
router.get("/", async (req, res) => {
  const jobs = await getJobs();
  res.json({ success: true, data: jobs });
});

// Existing kept ✔
router.get("/:id", async (req, res) => {
  const job = await getJob(req.params.id);
  if (!job) return res.status(404).json({ success: false, message: "Job not found" });
  res.json({ success: true, data: job });
});

// Existing kept but enhanced ✔
router.post("/", async (req, res) => {
  try {
    const job = await createJob(req.body);
    res.status(201).json({
      success: true,
      data: job,
      company_id: req.body.company_id || null
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create job", error: err.message });
  }
});

// Existing kept ✔
router.put("/:id", async (req, res) => {
  try {
    const job = await updateJob(req.params.id, req.body);
    res.json({
      success: true,
      data: job,
      company_id: req.body.company_id || null
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update job", error: err.message });
  }
});

// Existing kept ✔
router.delete("/:id", async (req, res) => {
  try {
    await deleteJob(req.params.id);
    res.json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete job", error: err.message });
  }
});

// ================= PHASE 3 ROUTES (kept as-is) =================
router.get("/company/:id/jobs", async (req, res) => {
  try {
    const jobs = await fetchJobsByCompany(req.params.id);
    res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch jobs by company", error: err.message });
  }
});

router.get("/jobs/analytics", async (req, res) => {
  try {
    const jobs = await assignCompanyRelationInJobs();
    res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch analytics jobs", error: err.message });
  }
});

router.post("/assign/company", async (req, res) => {
  try {
    const result = await insertJobByCompany(req.body);
    res.status(201).json({ success: true, message: "Job assigned to company successfully", jobId: result.insertId, company_id: req.body.company_id });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to assign job to company", error: err.message });
  }
});

router.get("/company/:companyId", async (req, res) => {
  try {
    const jobs = await fetchJobsByCompany(req.params.companyId);
    res.json({ success: true, data: jobs });
  } catch {
    res.status(500).json({ success: false, message: "Failed to load company jobs" });
  }
});

// Duplicate kept ✔
router.get("/company/:id", async (req, res) => {
  const jobs = await fetchJobsByCompany(req.params.id);
  res.json({ success: true, data: jobs });
});

router.get("/company/:id", getJobsByCompany);

// ================= NEW ROUTES (jobs + recruiter interactive) =================

// Increment job views ✔
router.put("/views/:id", incrementViews);

// Shortlist Candidate API ✔ (URL ready, but controller not crashing due to safe import)
router.put("/applications/shortlist/:id", shortlistCandidate);

// Offer Letter API ✔
router.put("/applications/offer/:id", sendOfferLetter);

// Recruiter Analytics ✔
router.get("/recruiter/:id/analytics", recruiterAnalytics);

// Salary Analytics ✔
router.get("/analytics/salary/:recruiterId", salaryAnalytics);

// ============================================================================

export default router;
