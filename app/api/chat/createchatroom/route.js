import connectDb from "@/lib/connectDb";
import Chat from "@/models/chat";
import User from "@/models/user";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { reciever, sender, gigChat } = await req.json();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (!reciever || !sender) {
    return NextResponse.json({ message: "Empty values not allowed" });
  }
  try {
    await connectDb();

    const newchat = new Chat({
      reciever,
      sender,
      gigChat,
    });

    await newchat.save();
    const comm = await Chat.find({ _id: newchat._id });
    return NextResponse.json({
      userstatus: true,
      message: "Chat Created successfully",
      results: comm,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      userstatus: "error",
      message: error,
    });
  }
}
