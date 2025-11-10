import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { upsertUser } from "./stream.js";

export const inngestClient = new Inngest({ id: "talent-iq" });

const syncUser = inngestClient.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    // Check if user already exists
    let user = await User.findOne({ id });

    if (!user) {
      // Create new user
      const newUser = {
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        email: email_addresses[0]?.email_address || "",
        profileImage: image_url || "",
        clerkId: id,
      };
      user = await User.create(newUser);
      await upsertUser({
        id: user.clerkId.toString(),
        name: newUser.name,
        profileImage: newUser.profileImage,
      });
    }

    return user;
  }
);

const deleteUser = inngestClient.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    // Delete user
    await User.findOneAndDelete({ clerkId: id });

    await deleteUser(id);

    return { success: true };
  }
);

export const inngestFunctions = [syncUser, deleteUser];
