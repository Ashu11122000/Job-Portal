import pool from "../../config/db.js";

export const saveResume = async (req, res) => {
  const { name, title, summary, skills, experience, education, certifications, email, phone, location, links } = req.body;

  const sql = `INSERT INTO resumes (name, title, summary, skills, experience, education, certifications, email, phone, location, links)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const [result] = await pool.execute(sql, [name, title, summary, skills, experience, education, certifications, email, phone, location, links]);

  res.status(201).json({ success: true, resumeId: result.insertId });
};
