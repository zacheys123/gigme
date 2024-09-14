import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function getUsersPosts(params) {
  try {
    await connectDb();
    let posts = await Post.find({ postedBy: params }).populate({
      path: "postedBy",
      model: User,
    });

    return posts;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
