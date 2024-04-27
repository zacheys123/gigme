import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { userId } = auth();
  console.log(params.id);
  console.log(userId);

  try {
    await connectDb();

    const newUser = await User.findById(params.id);
    await newUser.updateOne(
      {
        $push: {
          followers: {
            follower: userId,
          },
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ result: newUser, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
}
