import connectDb from "@/lib/connectDb";
import Reply from "@/models/reply";
import Comment from "@/models/comments";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();
    let replies = await Reply.find()
      .populate({
        path: "postedBy",
        model: User,
      })
      .populate({
        path: "commentId",
        model: Comment,
      });

    return NextResponse.json({ replies }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
