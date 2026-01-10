import pool from "../../config/db.js";

export const createSession = async (req, res) => {
  const { role, difficulty } = req.body;
  const sql = `INSERT INTO mock_interviews (role, difficulty) VALUES (?, ?)`;
  const [result] = await pool.execute(sql, [role, difficulty]);

  res.status(201).json({ success: true, sessionId: result.insertId });
};
