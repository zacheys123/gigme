import User from "@/models/user";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import { pusher } from "@/lib/pusher";
export async function GET(req, { params }) {
  const user = await currentUser();
  try {
    await connectDb();
    const users = await User.find({ isOnline: true });
    // pusher online user trigger

    // emit an event to pusher to notify other clients that this user is online
    // this is a basic example, you may want to add more logic to handle specific events or user data
    // for example, you could send a notification to the user, or update their status in the UI
    // or you could even create a chat room for the user and broadcast messages to that room
    // users.includes(user?.firstName)
    //   ? pusher.trigger("chat-room", "new-message", {
    //       user_id: user._id,
    //       message: "User is now online",
    //     })
    //   : pusher.trigger("chat-room", "new-message", {
    //       user_id: user._id,
    //       message: "User is offline",
    //     });

    return NextResponse.json({ users, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error, status: 500 });
  }
}
