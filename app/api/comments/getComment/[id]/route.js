import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import Comment from "@/models/comments";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDb();
    let comment = await Comment.findOne({ _id: params.id })
      .populate({
        path: "postedBy",
        model: User,
      })
      .populate({
        path: "postId",
        model: Post,
      });

    return NextResponse.json({ comment }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
