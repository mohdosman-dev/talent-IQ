import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .send({ message: "Problem and difficulty are required" });
    }

    const userId = req.user.clerkId;
    const callId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;

    // Here you would typically create a session in your database
    const session = await Session.create({
      hostId: userId,
      problem,
      difficulty,
      callId,
      status: "active",
    });

    // Start the session (e.g., initialize video/audio call via Stream)
    await streamClient.video.call("default", callId).getOrCreate({
      created_by_id: userId,
      custom: { problem, difficulty, sessionId: session._id.toString() },
    });

    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      members: [userId],
      created_by_id: userId,
    });
    await channel.create();

    return res
      .status(201)
      .send({ message: "Session created successfully", session });
  } catch (error) {
    res.status(500).send({ message: "Failed to create session" });
  }
}

export async function getActiveSessions(req, res) {
  try {
    const activeSessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);
    return res.status(200).send({
      message: "Active session retreived successfully",
      activeSessions,
    });
  } catch (error) {
    console.error("Failed to fetch active sessions", error);
    return res.status(500).send({ message: "Failed to fetch active sessions" });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user.clerkId;
    const recentSessions = await Session.find({
      status: "completed",
      $or: [{ hostId: userId }, { participantId: userId }],
    })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);
    return res.status(200).send({
      message: "Recent sessions retrieved successfully",
      recentSessions,
    });
  } catch (error) {
    console.error("Failed to fetch recent sessions", error);
    return res.status(500).send({ message: "Failed to fetch recent sessions" });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;
    const session = await Session.findById(id)
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId");

    if (!session) {
      return res.status(404).send({ message: "Session not found" });
    }

    return res
      .status(200)
      .send({ message: "Session retrieved successfully", session });
  } catch (error) {
    console.error("Failed to fetch session by ID", error);
    return res.status(500).send({ message: "Failed to fetch session" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).send({ message: "Session not found" });
    }

    if (session.status !== "active") {
      return res
        .status(400)
        .send({ message: "Cannot join a session that is not active" });
    }

    if (session.participant) {
      return res
        .status(400)
        .send({ message: "Session already has a participant" });
    }

    session.participant = userId;
    await session.save();

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    return res
      .status(200)
      .send({ message: "Joined session successfully", session });
  } catch (error) {
    console.error("Failed to join session", error);
    return res.status(500).send({ message: "Failed to join session" });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.clerkId;

    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).send({ message: "Session not found" });
    }

    if (session.hostId !== userId) {
      return res
        .status(403)
        .send({ message: "Only the host can end the session" });
    }

    if (session.status !== "active") {
      return res
        .status(400)
        .send({ message: "Cannot end a session that is not active" });
    }

    session.status = "completed";
    session.endedAt = new Date();
    await session.save();

    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    return res
      .status(200)
      .send({ message: "Session ended successfully", session });
  } catch (error) {
    console.error("Failed to end session", error);
    return res.status(500).send({ message: "Failed to end session" });
  }
}
