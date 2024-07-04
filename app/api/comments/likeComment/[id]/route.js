import connectDb from "@/lib/connectDb";
import Comment from "@/models/comments";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { userId } = await req.json();

  console.log(params.id);
  console.log(userId);

  try {
    await connectDb();

    let mylikes;
    mylikes = await Comment.findById(params.id);
    if (mylikes.likes.includes(userId)) {
      return NextResponse.json({ mylikes, status: 403 });
    }
    await mylikes.updateOne({ $push: { likes: userId } });
    mylikes = await Comment.findById(params.id);
    return NextResponse.json({ mylikes, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
}
