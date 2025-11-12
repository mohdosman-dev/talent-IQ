import express from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { protectRoutes } from "../middlewares/protectRoutes.js";

const chatRoutes = express.Router();

// Example protected route
chatRoutes.get("/token", protectRoutes, getStreamToken);

export default chatRoutes;
