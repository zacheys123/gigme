import connectDb from "@/lib/connectDb";
import Gig from "@/models/gigs";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function getAllGigs() {
  try {
    await connectDb();

    const users = await Gig.find().populate({ path: "postedBy", model: User });

    return users;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
