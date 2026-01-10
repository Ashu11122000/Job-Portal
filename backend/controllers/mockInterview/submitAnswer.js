import pool from "../../config/db.js";

export const submitAnswer = async (req, res) => {
  const { sessionId, answers } = req.body;
  const sql = `UPDATE mock_interviews SET answers = ? WHERE id = ?`;
  await pool.execute(sql, [JSON.stringify(answers), sessionId]);

  res.json({ success: true, message: "Answers saved" });
};
