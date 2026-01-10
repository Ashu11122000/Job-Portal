import pool from "../../config/db.js";

export const getResumeById = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.execute("SELECT * FROM resumes WHERE id = ?", [id]);

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: "Resume not found" });
  }

  res.json({ success: true, resume: rows[0] });
};
