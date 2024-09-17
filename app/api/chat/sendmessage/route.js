import connectDb from "@/lib/connectDb";
import Chat from "@/models/chat";
import User from "@/models/user";
import Message from "@/models/messages";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { pusher } from "@/lib/pusher";

export async function POST(req) {
  const { userId } = auth();
  const { sender, text, reciever, gigChat } = await req.json();
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  try {
    await connectDb();
    // console.log("senders: " + sender);
    // console.log("recievers: " + reciever);
    if (!text || !sender) {
      return;
    }
    const newMessage = new Message({
      text,
      sender,
      reciever,
    });
    await newMessage.save();
    let chat = await Chat.findOne({
      users: { $all: [sender, reciever] },
    });
    chat.messages.push(newMessage._id);
    await chat.save();
    let message = await Message.findOne({ _id: newMessage._id })
      .populate({ path: "sender", model: User })
      .populate({ path: "reciever", model: User });
    pusher.trigger(`chat-channel`, "new-message", message);

    // implement socket io functionality

    return NextResponse.json({
      chatStatus: true,
      message,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", error);
  }
}
