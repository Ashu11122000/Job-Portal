import pool from "../../config/db.js";

export const getSession = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.execute("SELECT * FROM mock_interviews WHERE id = ?", [id]);

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: "Session not found" });
  }

  res.json({ success: true, session: rows[0] });
};
