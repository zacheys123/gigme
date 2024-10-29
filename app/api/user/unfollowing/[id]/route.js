import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { following } = await req.json();

  console.log(params.id);
  console.log(following);

  try {
    await connectDb();
    let existing = await User.findById(following);

    const newUser = await User.findByIdAndUpdate(following, {
      $pull: { followings: params.id },
    });

    return NextResponse.json({ result: newUser, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
}
