import express from "express";
import * as companyController from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", companyController.getAllCompanies);
router.get("/:id", companyController.getCompanyById);

// Protected routes
router.post("/", protect, authorizeRoles("recruiter", "admin"), companyController.createCompany);
router.put("/:id", protect, authorizeRoles("recruiter", "admin"), companyController.updateCompany);
router.delete("/:id", protect, authorizeRoles("recruiter", "admin"), companyController.deleteCompany);

export default router;
