import pool from "../../config/db.js";

export const listSessions = async (req, res) => {
  const [rows] = await pool.execute("SELECT id, role, difficulty, created_at FROM mock_interviews ORDER BY created_at DESC");
  res.json({ success: true, sessions: rows });
};
