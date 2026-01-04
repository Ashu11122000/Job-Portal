import pool from "../../config/db.js";

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const [job] = await pool.query("SELECT id FROM jobs WHERE id = ?", [id]);
    if (!job.length) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await pool.query("DELETE FROM jobs WHERE id = ?", [id]);
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    console.error("❌ Error in deleteJob:", err);
    res.status(500).json({ success: false, message: "Failed to delete job" });
  }
};
