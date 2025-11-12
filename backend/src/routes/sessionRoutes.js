import express from "express";
import { protectRoutes } from "../middlewares/protectRoutes.js";
import {
  createSession,
  endSession,
  getActiveSessions,
  getMyRecentSessions,
  getSessionById,
  joinSession,
} from "../controllers/sessionController.js";

const sessionRoutes = express.Router();

// Example protected route
sessionRoutes.post("/", protectRoutes, createSession);
sessionRoutes.get("/active", protectRoutes, getActiveSessions);
sessionRoutes.get("/my-recent", protectRoutes, getMyRecentSessions);

sessionRoutes.get("/:id", protectRoutes, getSessionById);
sessionRoutes.post("/:id/join", protectRoutes, joinSession);
sessionRoutes.post("/:id/end", protectRoutes, endSession);

export default sessionRoutes;
