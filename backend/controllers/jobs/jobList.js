import pool from "../../config/db.js";

/**
 * GET ALL JOBS
 * Returns jobs with company name (JOIN)
 */
export const getJobs = async () => {
  const [rows] = await pool.query(`
    SELECT
      jobs.id,
      jobs.title,
      jobs.description,
      jobs.salary,
      jobs.location,
      jobs.created_at,
      jobs.company_id,
      companies.name AS company
    FROM jobs
    JOIN companies ON jobs.company_id = companies.id
    ORDER BY jobs.created_at DESC
  `);

  return rows;
};

/**
 * GET SINGLE JOB BY ID
 */
export const getJob = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      jobs.id,
      jobs.title,
      jobs.description,
      jobs.salary,
      jobs.location,
      jobs.created_at,
      jobs.company_id,
      companies.name AS company
    FROM jobs
    JOIN companies ON jobs.company_id = companies.id
    WHERE jobs.id = ?
    `,
    [id]
  );

  return rows[0];
};

/**
 * CREATE JOB
 * Expects company_id (NOT company name)
 */
export const createJob = async (job) => {
  const { title, description, salary, location, company_id } = job;

  const [result] = await pool.query(
    `
    INSERT INTO jobs (title, description, salary, location, company_id)
    VALUES (?, ?, ?, ?, ?)
    `,
    [title, description, salary, location, company_id]
  );

  return {
    id: result.insertId,
    title,
    description,
    salary,
    location,
    company_id,
  };
};

/**
 * UPDATE JOB
 */
export const updateJob = async (id, job) => {
  const { title, description, salary, location, company_id } = job;

  await pool.query(
    `
    UPDATE jobs
    SET title = ?, description = ?, salary = ?, location = ?, company_id = ?
    WHERE id = ?
    `,
    [title, description, salary, location, company_id, id]
  );

  return {
    id: Number(id),
    title,
    description,
    salary,
    location,
    company_id,
  };
};

/**
 * DELETE JOB
 */
export const deleteJob = async (id) => {
  await pool.query("DELETE FROM jobs WHERE id = ?", [id]);
  return Number(id);
};
