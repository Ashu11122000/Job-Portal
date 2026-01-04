import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js"; // ✔ FIXED (you were importing applicationRoutes file here)
import applicationRoutes from "./routes/applicationRoutes.js";
import logger from "./utils/logger.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

logger.info("Middlewares initialized");

// Safe mount
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Global error catcher (PREVENTS 500 crash)
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR →", err);
  logger.error(`API Crash: ${err.message}`);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
