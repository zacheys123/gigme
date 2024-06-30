import User from "@/models/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
export async function GET(req, { params }) {
  console.log(params);
  try {
    await connectDb();
    const user = await User.findOne({ clerkId: params.id });

    console.log(user);
    return NextResponse.json({ user, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error, status: 500 });
  }
}
