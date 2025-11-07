import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const ENV = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  SECRET_KEY: process.env.SECRET_KEY || "",
  ENV: process.env.ENV || "development",
};
