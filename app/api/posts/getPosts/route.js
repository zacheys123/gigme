import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

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
    ]);

    // Populate postedBy field with User data
    const populatedPosts = await User.populate(lastPosts, {
      path: "postedBy",
      model: User,
    });

    return NextResponse.json(populatedPosts, { status: 200 });
  } catch (error) {
    console.error("Error fetching last posts:", error);
    return NextResponse.json(
      { message: "Error fetching last posts", error: error.message },
      { status: 500 }
    );
  }
}
