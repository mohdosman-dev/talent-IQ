import express from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { protectRoutes } from "../middlewares/protectRoutes.js";

const router = express.Router();

// Example protected route
router.get("/token", protectRoutes, getStreamToken);

export default router;
