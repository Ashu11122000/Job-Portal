import pool from "../../config/db.js";

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, location, salary, description } = req.body;

    const [job] = await pool.query("SELECT id FROM jobs WHERE id = ?", [id]);
    if (!job.length) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await pool.query(
      "UPDATE jobs SET title = ?, company = ?, location = ?, salary = ?, description = ? WHERE id = ?",
      [title, company, location, salary, description, id]
    );

    res.json({ success: true, message: "Job updated successfully" });
  } catch (err) {
    console.error("❌ Error in updateJob:", err);
    res.status(500).json({ success: false, message: "Failed to update job" });
  }
};
