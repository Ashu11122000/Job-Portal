import { insertCompany } from "../../services/companyService.js";

export const createCompany = async (req, res) => {
  try {
    const result = await insertCompany(req.body);
    res.status(201).json({ success: true, message: "Company Created", companyId: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
