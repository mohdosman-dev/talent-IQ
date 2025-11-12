import { streamClient } from "../lib/stream.js";

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
