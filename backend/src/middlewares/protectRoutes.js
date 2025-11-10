import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoutes = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const user = await User.findOne({ clerkId });
      if (!user) {
        return res.status(403).send({ error: "Forbidden: User not found" });
      }

      // Attach user to request object for downstream use
      req.user = user;
      return next();
    } catch (error) {
      console.error("Cannot protect the router", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },
];
