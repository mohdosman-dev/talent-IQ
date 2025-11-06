import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";

const __dirname = path.resolve();

const app = express();

app.get("/health", (req, res) => {
  res.send({ msg: "Hello, TalentIQ Backend!" });
});

if (ENV.ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
});
