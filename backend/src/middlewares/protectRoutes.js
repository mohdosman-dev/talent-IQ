import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoutes = [
  requireAuth(),
  async (req, res, next) => {
    try {
      // requireAuth() already blocks unauthenticated requests and
      // populates req.auth().userId, so we can use it directly here.
      const clerkId = req.auth().userId;

      const user = await User.findOne({ clerkId });
      if (!user) {
        return res.status(403).send({ message: "Forbidden: User not found" });
      }

      // Attach user to request object for downstream use
      req.user = user;
      return next();
    } catch (error) {
      console.error("Cannot protect the router", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
];
