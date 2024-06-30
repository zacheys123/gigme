import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log(params);
  try {
    await connectDb();
    return NextResponse.json({ message: "Successfull" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
