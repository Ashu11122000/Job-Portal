import pool from "../../config/db.js";

export default async function listCoverLetters(req, res) {
  const [rows] = await pool.execute(
    "SELECT id, role, company, ats_score, created_at FROM cover_letters ORDER BY created_at DESC"
  );

  res.json({ success: true, data: rows });
}
