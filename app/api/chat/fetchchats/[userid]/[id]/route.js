import connectDb from "@/lib/connectDb";
import Chat from "@/models/chat";

import Message from "@/models/messages";

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
      chat: chats,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, status: 500 });
  }
}
