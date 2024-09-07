import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function getCurrentUser(params) {
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
