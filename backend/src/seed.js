import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { sampleJobs } from "./constants/jobs.js";
import { sampleCompanies } from "./constants/companies.js";
import Company from "./models/Company.js";
import Job from "./models/Job.js";
import dotenv from "dotenv";

dotenv.config();

const seedDatabase = async () => {
  await connectDB(); 
  console.log("Database connection established.");

  try {
    
    // Clear existing data
    await Company.deleteMany({}); 
    console.log("Existing Company data cleared.");

    await Job.deleteMany({});
    console.log("Existing Job data cleared.");

    // Insert new data
    await Company.insertMany(sampleCompanies); 
    console.log("Database successfully seeded with Company data!");

    await Job.insertMany(sampleJobs);
    console.log("Database successfully seeded with Job data!")

  } catch (error) {
    console.error("ERROR: Data seeding failed.", error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

//Execute Seed Function
seedDatabase();