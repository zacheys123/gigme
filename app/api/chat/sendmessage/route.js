import connectDb from "@/lib/connectDb";
import Chat from "@/models/chat";
import User from "@/models/user";
import Message from "@/models/messages";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId } = auth();
  const { sender, text, reciever } = await req.json();
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
    let chat = await Chat.findOne({
      users: { $all: [sender, reciever] },
    });
    if (!chat) {
      chat = await Chat.create({
        users: [sender, reciever],
      });
    }
    let newmessage = new Message({
      text,
      sender,
      reciever,
    });

    if (newmessage) {
      chat.messages.push(newmessage._id);
    }
    await Promise.all([chat.save(), newmessage.save()]);

    let message = await Message.findOne({ _id: newmessage._id })
      .populate({ path: "sender", model: User })
      .populate({ path: "reciever", model: User });
    return NextResponse.json({ chatStatus: true, message });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", error);
  }
}