import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req, res, next, params) {
  let par = req.url.split("/")[6];

  try {
    await connectDb();
    const current = await User.findOne({
      username: par,
    });

    return NextResponse.json({ user: current }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
}
