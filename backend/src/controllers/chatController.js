import { streamClient } from "../lib/stream.js";

/**
 * Create a Stream token for the authenticated user and send it with the user's ID, name, and image in the HTTP response.
 * @param {import('express').Request & { user: { clerkId: string, name?: string, imageUrl?: string } }} req - Express request with authenticated user info on `req.user`.
 * @param {import('express').Response} res - Express response used to send the token and user data or a 500 error on failure.
 */
export async function getStreamToken(req, res) {
  try {
    const token = streamClient.createToken(req.user.clerkId);
    res.send({
      token,
      userId: req.user.clerkId,
      name: req.user.name,
      image: req.user.imageUrl,
    });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    res.status(500).send({ message: "Failed to generate Stream token" });
  }
}