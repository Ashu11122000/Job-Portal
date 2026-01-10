import express from "express";
import { createSession } from "../controllers/mockInterview/createSession.js";
import { getSession } from "../controllers/mockInterview/getSession.js";
import { listSessions } from "../controllers/mockInterview/listSessions.js";
import { deleteSession } from "../controllers/mockInterview/deleteSession.js";
import { getQuestion } from "../controllers/mockInterview/getQuestion.js";
import { submitAnswer } from "../controllers/mockInterview/submitAnswer.js";
import { generateReport } from "../controllers/mockInterview/generateReport.js";

const router = express.Router();

router.post("/session", createSession);
router.get("/session/:id", getSession);
router.get("/session", listSessions);
router.delete("/session/:id", deleteSession);
router.post("/question", getQuestion);
router.post("/answer", submitAnswer);
router.post("/report/:id", generateReport);

export default router;
