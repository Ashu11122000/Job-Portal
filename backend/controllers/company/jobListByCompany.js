import { fetchJobsByCompany } from "../../services/companyService.js";

export const getJobsByCompany = async (req, res) => {
  try {
    const jobs = await fetchJobsByCompany(req.params.id);
    res.json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
