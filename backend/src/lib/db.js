import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  if (!ENV.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  try {
    const conn = await mongoose.connect(ENV.DATABASE_URL);
    console.log("Database connected successfully", conn.connection.host);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
