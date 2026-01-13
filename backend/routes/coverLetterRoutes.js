import express from "express";
import generateCoverLetter from "../controllers/coverLetter/generateCoverLetter.js";
import improveCoverLetter from "../controllers/coverLetter/improveCoverLetter.js";
import calculateATS from "../controllers/coverLetter/calculateATS.js";
import saveCoverLetter from "../controllers/coverLetter/saveCoverLetter.js";
import listCoverLetters from "../controllers/coverLetter/listCoverLetters.js";

const router = express.Router();

router.post("/generate", generateCoverLetter);
router.post("/improve", improveCoverLetter);
router.post("/ats-score", calculateATS);
router.post("/save", saveCoverLetter);
router.get("/list", listCoverLetters);

export default router;
