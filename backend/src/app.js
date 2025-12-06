import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import errorHandler from "./middleware/errorHandler.js";
import { limiter } from "./middleware/rateLimiter.js";
import registerRoutes from "./loaders/routes.js";

const app = express();

// 🧩 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(limiter);

// 🧠 Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Job Portal API is running successfully 🚀",
  });
});

// 🔐 Register Routes
registerRoutes(app);

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Handler Middleware (Must be last)
app.use(errorHandler);

export default app;
