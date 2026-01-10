import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Submit job application
router.post("/apply", async (req, res) => {
  const { jobId, userId, resume } = req.body;

  try {
    const [job] = await pool.query("SELECT id FROM jobs WHERE id=?", [jobId]);
    if (job.length === 0) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const [result] = await pool.query(
      "INSERT INTO applications (job_id, user_id, resume) VALUES (?,?,?)",
      [jobId, userId, resume || null]
    );

    res.status(201).json({
      success: true,
      message: "Application submitted",
      applicationId: result.insertId,
    });
  } catch (err) {
    console.error("❌ Apply API Error:", err);
    res.status(500).json({ success: false, message: "Failed to apply" });
  }
});

// Fetch applications of a specific user (Candidate / Recruiter / Admin can use)
router.get("/user/:userId", async (req, res) => {
  try {
    const [apps] = await pool.query(
      "SELECT * FROM applications WHERE user_id=? ORDER BY id DESC",
      [req.params.userId]
    );

    res.json({
      success: true,
      count: apps.length,
      applications: apps,
    });
  } catch (err) {
    console.error("❌ Fetch Applications Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete an application (if needed later)
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM applications WHERE id=?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.json({ success: true, message: "Application deleted" });
  } catch (err) {
    console.error("❌ Delete Application Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
