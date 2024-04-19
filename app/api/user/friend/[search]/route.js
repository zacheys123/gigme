import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req, res, next, params) {
  console.log(params);
  const { userId } = auth();
  try {
    await connectDb();
    const current = User.find({ clerkId: userId });
    if (!current?.includes(params)) {
      const user = await User.findOne({
        username: params,
        firstname: params,
        instrument: params,
        lastname: params,
      });
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
}
