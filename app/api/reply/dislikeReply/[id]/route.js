import connectDb from "@/lib/connectDb";
import Reply from "@/models/reply";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { userId } = await req.json();

  console.log(params.id);
  console.log(userId);

  try {
    await connectDb();
    let mydislikes;
    mydislikes = await Reply.findById(params.id);
    if (mydislikes.dislikes.includes(userId)) {
      return NextResponse.json({ mydislikes, status: 403 });
    }
    await mydislikes.updateOne({ $push: { dislikes: userId } });
    mydislikes = await Reply.findById(params.id);
    return NextResponse.json({ mydislikes, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
}
