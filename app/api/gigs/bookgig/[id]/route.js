import connectDb from "@/lib/connectDb";
import Gigs from "@/models/gigs";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { userid, ispend } = await req.json();
  console.log(userid);
  try {
    const existing = await User.findOne({ _id: userid });
    if (existing) {
      const newGig = await Gigs.findById({ _id: params.id });
      await newGig.updateOne({
        $set: {
          isPending: true,
          bookedBy: userid,
        },
      });
      const currentgig = await Gigs.findById({ _id: newGig._id }).populate({
        path: "bookedBy",
        model: User,
      });
      return NextResponse.json({
        gigstatus: "true",
        message: "Updated Gig successfully",
        results: currentgig,
      });
    }
    return NextResponse.json({
      gigstatus: "false",
      message: "User not found",
    });
  } catch (error) {}
}
