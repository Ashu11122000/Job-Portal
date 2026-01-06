import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import logger from "./utils/logger.js";
import companyRoutes from "./routes/companyRoutes.js"; // ✔ ADDED for Company APIs
import companyLogoRoutes from "./routes/companyLogoRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

logger.info("Middlewares initialized");

// Safe mount (Existing routes kept)
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Company API mount (Newly added)
app.use("/api/company", companyRoutes);
logger.info("Company routes loaded successfully"); // ✔ NEW LOG ADDED (existing code untouched)

app.use("/api/company/logo", companyLogoRoutes);

// Global error catcher (Existing kept)
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
