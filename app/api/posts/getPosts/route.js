import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();

    try {
      const lastPosts = await Post.aggregate([
        {
          $sort: { createdAt: -1 }, // Sort posts by creation date in descending order
        },
        {
          $group: {
            _id: "$postedBy", // Group by userId
            lastPost: { $first: "$$ROOT" }, // Get the first (latest) post of each group
          },
        },
        {
          $replaceRoot: { newRoot: "$lastPost" }, // Replace the root with the last post object
        },
      ]).populate({
        path: "postedBy",
        model: User,
      });
      res.status(200).json(lastPosts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching last posts", error });
    }
    return NextResponse.json({ latestPosts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
