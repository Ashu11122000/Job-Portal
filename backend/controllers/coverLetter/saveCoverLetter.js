import pool from "../../config/db.js";

export default async function saveCoverLetter(req, res) {
  const {
    name,
    role,
    company,
    experience,
    skills,
    tone,
    template,
    content,
    atsScore,
  } = req.body;

  await pool.execute(
    `INSERT INTO cover_letters
     (name, role, company, experience, skills, tone, template, content, ats_score)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      role,
      company,
      experience,
      skills,
      tone,
      template,
      content,
      atsScore,
    ]
  );

  res.json({ success: true, message: "Cover letter saved" });
}
