import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();
    let allposts = await Post.find().populate({
      path: "postedBy",
      model: User,
    });

    return NextResponse.json({ posts: allposts, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
