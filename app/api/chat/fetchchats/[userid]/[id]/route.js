import connectDb from "@/lib/connectDb";
import Chat from "@/models/chat";
import User from "@/models/user";
import Message from "@/models/messages";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id: usertochatId, userid: sender } = params;
    await connectDb();

    console.log(usertochatId, sender);

    let chats = await Chat.findOne({
      users: { $all: [sender, usertochatId] },
    }).populate({ path: "messages", model: Message });

    if (!chats) return NextResponse.json([]);

    return NextResponse.json({
      success: true,
      status: 200,
      chat: chats.messages,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, status: 500 });
  }
}