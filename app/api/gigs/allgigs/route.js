import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import connectDb from "@/lib/connectDb";
import Gigs from "@/models/gigs";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  console.log(params);
  try {
    await connectDb();
    let gigs = await Gigs.find()
      .populate({
        path: "postedBy",
        model: User,
      })
      .populate({
        path: "bookedBy",
        model: User,
      })
      .collation({ locale: "en", strength: 2 })
      .exec();

    return NextResponse.json({ gigs });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
