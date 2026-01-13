import express from "express";
import generateRoadmap from "../controllers/roadmap/generateRoadmap.js";
import skillsByRole from "../controllers/roadmap/skillsByRole.js";
import projectsByRole from "../controllers/roadmap/projectsByRole.js";
import salaryInsights from "../controllers/roadmap/salaryInsights.js";

const router = express.Router();

router.post("/generate", generateRoadmap);
router.get("/skills", skillsByRole);
router.get("/projects", projectsByRole);
router.get("/salary", salaryInsights);

export default router;
