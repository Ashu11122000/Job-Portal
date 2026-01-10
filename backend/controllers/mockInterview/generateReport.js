import pool from "../../config/db.js";

export const generateReport = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.execute("SELECT answers FROM mock_interviews WHERE id = ?", [id]);

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: "Session not found" });
  }

  const answers = rows[0].answers;
  const score = 5; // mock score for MVP
  const feedback = "Good attempt. Practice STAR method and technical depth.";

  const sql = `UPDATE mock_interviews SET score = ?, feedback = ? WHERE id = ?`;
  await pool.execute(sql, [score, feedback, id]);

  res.json({ success: true, score, feedback });
};
