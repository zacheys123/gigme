import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { follower } = await req.json();

  console.log(params.id);
  console.log(follower);

  try {
    await connectDb();

    let newUser;
    let friend = await User.findById(params.id);
    if (friend.followers.includes(follower)) {
      return NextResponse.json({ result: friend, status: 403 });
    }

    newUser = await friend.updateOne({ $push: { followers: follower } });
    friend = await User.findById(params.id);
    return NextResponse.json({ result: friend, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
}
