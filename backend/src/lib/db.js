import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.DATABASE_URL, {});
    console.log(" Database connected successfully", conn.connection.host);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
