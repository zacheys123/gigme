import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
