import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, media, description, postedBy } = await req.json();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (!title || !media || !description || !postedBy) {
    return NextResponse.json({ message: "Please provide all required fields" });
  }
  try {
    await connectDb();

    const newPost = new Post({
      title,
      description,
      media,
      postedBy,
    });
    const post = await newPost.save();

    return NextResponse.json({
      userstatus: true,
      message: "Posted Uploaded successfully",
      results: post,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      userstatus: "error",
      message: error,
    });
  }
}
