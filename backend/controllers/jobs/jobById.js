import pool from "../../config/db.js";

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const [job] = await pool.query("SELECT * FROM jobs WHERE id = ?", [id]);

    if (!job.length) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, data: job[0] });
  } catch (err) {
    console.error("❌ Error in getJobById:", err);
    res.status(500).json({ success: false, message: "Failed to fetch job" });
  }
};
