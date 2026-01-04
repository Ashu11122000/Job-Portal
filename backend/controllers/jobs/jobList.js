import pool from "../../config/db.js";

export const getJobs = async () => {
  const [rows] = await pool.query("SELECT * FROM jobs");
  return rows;
};

export const getJob = async (id) => {
  const [rows] = await pool.query("SELECT * FROM jobs WHERE id = ?", [id]);
  return rows[0];
};

export const createJob = async (job) => {
  const { title, company, location, salary, description } = job;

  const [result] = await pool.query(
    "INSERT INTO jobs (title, company, location, salary, description) VALUES (?,?,?,?,?)",
    [title, company, location, salary, description]
  );

  return {
    id: result.insertId,
    title,
    company,
    location,
    salary,
    description,
  };
};

export const updateJob = async (id, job) => {
  const { title, company, location, salary, description } = job;

  await pool.query(
    "UPDATE jobs SET title = ?, company = ?, location = ?, salary = ?, description = ? WHERE id = ?",
    [title, company, location, salary, description, id]
  );

  return { id: Number(id), title, company, location, salary, description };
};

export const deleteJob = async (id) => {
  await pool.query("DELETE FROM jobs WHERE id = ?", [id]);
  return Number(id);
};
