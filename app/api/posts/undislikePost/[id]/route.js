import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { userId } = await req.json();

  console.log(params.id);
  console.log(userId);

  try {
    await connectDb();
    let mydislikes;
    mydislikes = await Post.findById(params.id);

    await mydislikes.updateOne({ $pull: { dislikes: userId } });
    mydislikes = await Post.findById(params.id);
    return NextResponse.json({ mydislikes, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
}
