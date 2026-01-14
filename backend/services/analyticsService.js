// services/analytics.service.js
import db from "../config/db.js";

export const getAnalyticsSummaryService = async () => {
  const [[jobs]] = await db.query("SELECT COUNT(*) AS totalJobs FROM jobs");
  const [[applications]] = await db.query(
    "SELECT COUNT(*) AS totalApplications FROM applications"
  );
  const [[users]] = await db.query("SELECT COUNT(*) AS totalUsers FROM users");

  return {
    jobs: jobs.totalJobs,
    applications: applications.totalApplications,
    users: users.totalUsers,
  };
};

export const getJobStatsService = async () => {
  const [[result]] = await db.query(
    "SELECT COUNT(*) AS totalJobs FROM jobs"
  );
  return result;
};

export const getApplicationStatsService = async () => {
  const [[result]] = await db.query(
    "SELECT COUNT(*) AS totalApplications FROM applications"
  );
  return result;
};
