import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("STREAM_API_KEY or STREAM_API_SECRET is not defined");
}

export const streamClient = new StreamClient(apiKey, apiSecret); // Vide/Audio call features
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); // Chat featrues

export const upsertUser = async (userData) => {
  try {
    await chatClient.upsertUser([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting user to Stream:", error);
    throw error;
  }
};

export const streamDeleteUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId, { markMessagesDeleted: true });
  } catch (error) {
    console.error("Error deleting user from Stream:", error);
    throw error;
  }
};
