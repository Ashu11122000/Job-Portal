import { fetchJobsByCompany } from "../../services/jobService.js";

export const getJobsByCompany = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const jobs = await fetchJobsByCompany(companyId);

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (err) {
    next(err);
  }
};
