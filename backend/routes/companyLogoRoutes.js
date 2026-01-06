import express from "express";
import { companyLogoUpload } from "../controllers/company/logoUploadController.js";

const router = express.Router();

router.put("/logo/:id", companyLogoUpload);

export default router;
