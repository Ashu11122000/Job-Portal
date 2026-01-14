import express from "express";
import pool from "../config/db.js";

const router = express.Router();

/**
 * APPLY FOR A JOB
 * Frontend should call: POST /api/applications
 * (We also keep /apply as alias)
 */
const applyJobHandler = async (req, res) => {
  const { jobId, userId } = req.body; // ❌ resume removed (not in DB)

  if (!jobId || !userId) {
    return res.status(400).json({
      success: false,
      message: "jobId and userId are required",
    });
  }

  try {
    // 1. Check if job exists
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

    // 2. Prevent duplicate application
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

    // 3. Insert application (✅ FIXED — matches DB schema)
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
    console.error("❌ Apply Job DB Error:", err.sqlMessage || err.message);
    res.status(500).json({
      success: false,
      message: err.sqlMessage || "Database error",
    });
  }
};

/* ✅ MAIN APPLY ROUTE */
router.post("/", applyJobHandler);

/* ✅ BACKWARD-COMPATIBLE ALIAS */
router.post("/apply", applyJobHandler);

/**
 * GET APPLICATIONS BY USER
 * GET /api/applications/user/:userId
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const [apps] = await pool.query(
      "SELECT * FROM applications WHERE user_id = ? ORDER BY id DESC",
      [req.params.userId]
    );

    res.json({
      success: true,
      count: apps.length,
      applications: apps,
    });
  } catch (err) {
    console.error("❌ Fetch Applications Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * DELETE APPLICATION
 * DELETE /api/applications/:id
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
    console.error("❌ Delete Application Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
