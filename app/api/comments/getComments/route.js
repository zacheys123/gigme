import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import Comment from "@/models/comments";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    let comments = await Comment.find()
      .populate({
        path: "postedBy",
        model: User,
      })
      .populate({
        path: "postId",
        model: Post,
      });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
