import { fetchCompanies, fetchCompanyById } from "../../services/companyService.js";

export const getCompanies = async (req, res) => {
  try {
    const companies = await fetchCompanies();
    res.status(200).json({ success: true, companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const company = await fetchCompanyById(req.params.id);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });
    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
