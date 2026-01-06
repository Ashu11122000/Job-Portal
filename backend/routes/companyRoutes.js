import express from "express";
import { createCompany } from "../controllers/company/companyCreate.js";
import { getCompanies, getCompany } from "../controllers/company/companyList.js";
import { updateCompany } from "../controllers/company/companyUpdate.js";
import { deleteCompanies, deleteCompany } from "../controllers/company/companyDelete.js";
import { getJobsByCompany } from "../controllers/company/companyJobController.js";

const router = express.Router();

router.post("/", createCompany);
router.get("/", getCompanies);
router.get("/:id", getCompany);
router.put("/:id", updateCompany);
router.delete("/", deleteCompanies);
router.delete("/:id", deleteCompany);
router.get("/jobs/:id", getJobsByCompany);

export default router;
