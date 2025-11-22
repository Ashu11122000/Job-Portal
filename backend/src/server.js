import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/index.js";

dotenv.config();

// Connect Database
connectDB();

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
