import connectDb from "@/lib/connectDb";
import Gigs from "@/models/gigs";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { userid } = await req.json();
  console.log(userid);
  try {
    const newGig = await Gigs.findById(params.id);
    await newGig.updateOne(
      {
        $set: {
          isPending: false,
          bookedBy: userid,
        },
      },
      { new: true }
    );
    const currentgig = await Gigs.findById(newGig._id).populate({
      path: "bookedBy",
      model: User,
    });
    return NextResponse.json({
      gigstatus: "true",
      message: "Updated Gig successfully",
      results: currentgig,
    });
  } catch (error) {
    console.log(error);
  }
}
