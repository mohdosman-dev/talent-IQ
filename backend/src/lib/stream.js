import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("STREAM_API_KEY or STREAM_API_SECRET is not defined");
}

export const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertUser = async (userData) => {
  try {
    await streamClient.upsertUser([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting user to Stream:", error);
    throw error;
  }
};

export const streamDeleteUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId, { markMessagesDeleted: true });
  } catch (error) {
    console.error("Error deleting user from Stream:", error);
    throw error;
  }
};
