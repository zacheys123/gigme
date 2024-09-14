import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  try {
    await connectDb();
    let posts = await Post.find({ postedBy: params.id }).populate({
      path: "postedBy",
      model: User,
    });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
