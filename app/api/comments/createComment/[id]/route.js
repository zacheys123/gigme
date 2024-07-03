import connectDb from "@/lib/connectDb";
import Comment from "@/models/comments";
import User from "@/models/user";
import { auth, currentUser } from "@clerk/nextjs";
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

    const newComment = new Comment({
      text,
      postId: params.id,
      postedBy,
    });
    await newComment.save();

    const comm = await Comment.find({ _id: newComment._id }).populate({
      path: "postedBy",
      model: User,
    });
    return NextResponse.json({
      userstatus: true,
      message: "Comment uploaded successfully",
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
