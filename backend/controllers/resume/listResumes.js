import pool from "../../config/db.js";

export const listResumes = async (req, res) => {
  const [rows] = await pool.execute("SELECT id, name, title, created_at FROM resumes ORDER BY created_at DESC");
  res.json({ success: true, resumes: rows });
};
