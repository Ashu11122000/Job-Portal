import express from "express";
import { login } from "../controllers/auth/loginController.js";
import { register } from "../controllers/auth/registerController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
