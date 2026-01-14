import express from "express";
import pool from "../config/db.js";

const router = express.Router();

/**
 * =========================================================
 * APPLY FOR A JOB
 * POST /api/applications
 * =========================================================
 */
const applyJobHandler = async (req, res) => {
  const { jobId, userId } = req.body;

  if (!jobId || !userId) {
    return res.status(400).json({
      success: false,
      message: "jobId and userId are required",
    });
  }

  try {
    const [job] = await pool.query(
      "SELECT id FROM jobs WHERE id = ?",
      [jobId]
    );

    if (job.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const [existing] = await pool.query(
      "SELECT id FROM applications WHERE job_id = ? AND user_id = ?",
      [jobId, userId]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO applications (job_id, user_id, status) VALUES (?, ?, ?)",
      [jobId, userId, "pending"]
    );

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: result.insertId,
    });
  } catch (err) {
    console.error("❌ Apply Job Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
};

router.post("/", applyJobHandler);
router.post("/apply", applyJobHandler);

/**
 * =========================================================
 * GET APPLICATIONS BY USER (✔ FIXED JOIN)
 * GET /api/applications/user/:userId
 * =========================================================
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const [apps] = await pool.query(
      `
      SELECT 
        a.id,
        a.status,
        a.applied_at,
        j.id AS job_id,
        j.title AS job_title,
        j.location,
        c.company_name AS company
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      LEFT JOIN companies c ON j.company_id = c.id
      WHERE a.user_id = ?
      ORDER BY a.id DESC
      `,
      [req.params.userId]
    );

    res.json({
      success: true,
      count: apps.length,
      applications: apps,
    });
  } catch (err) {
    console.error("❌ Fetch Applications Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
});

/**
 * =========================================================
 * DELETE APPLICATION
 * =========================================================
 */
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM applications WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (err) {
    console.error("❌ Delete Application Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
