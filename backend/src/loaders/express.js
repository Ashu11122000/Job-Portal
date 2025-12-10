// Express loader - initializes express app with all configurations
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import config from "../config/index.js";

export const initializeExpress = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: config.FRONTEND_URL, // http://localhost:5173
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(compression());
  return app;
};
