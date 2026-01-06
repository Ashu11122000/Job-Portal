import { updateCompanyDB } from "../../services/companyService.js";

export const updateCompany = async (req, res, next) => {
  try {
    const id = req.params.id;
    await updateCompanyDB(id, req.body);

    res.status(200).json({
      success: true,
      message: "Company Updated",
    });
  } catch (err) {
    next(err);
  }
};
