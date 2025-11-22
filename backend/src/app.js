import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// 🧩 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

// 🧠 Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Job Portal API is running successfully 🚀",
  });
});

// 🔐 Auth Routes
app.use("/api/auth", authRoutes);

export default app;
