import express from "express";
import pool from "../config/db.js";

const router = express.Router();

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
      applicationId: result.insertId
    });
  } catch (err) {
    console.error("❌ Apply API Error:", err);
    res.status(500).json({ success: false, message: "Failed to apply" });
  }
});

export default router;
