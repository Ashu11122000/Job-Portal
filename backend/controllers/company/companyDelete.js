import { deleteAllCompaniesDB, deleteCompanyByIdDB } from "../../services/companyService.js";

export const deleteCompanies = async (req, res, next) => {
  try {
    await deleteAllCompaniesDB();
    res.status(200).json({
      success: true,
      message: "All companies deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteCompanyByIdDB(id);
    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
