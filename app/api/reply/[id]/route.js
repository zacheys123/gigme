import connectDb from "@/lib/connectDb";
import Reply from "@/models/reply";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { text, postedBy } = await req.json();
  const { userId } = auth();
  console.log(text, postedBy);
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (!text || !postedBy) {
    return NextResponse.json({ message: "Empty values not allowed" });
  }
  try {
    await connectDb();

    const newReply = new Reply({
      text,
      commentId: params.id,
      postedBy,
    });
    await newReply.save();

    const rep = await Reply.find().populate({
      path: "postedBy",
      model: User,
    });
    return NextResponse.json({
      userstatus: true,
      message: "Reply uploaded successfully",
      results: rep,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      userstatus: "error",
      message: error,
    });
  }
}
