import pool from "../../config/db.js";

export const deleteSession = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.execute("DELETE FROM mock_interviews WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ success: false, message: "Session not found" });
  }

  res.json({ success: true, message: "Session deleted" });
};
