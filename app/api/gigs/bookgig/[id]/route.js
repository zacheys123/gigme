import connectDb from "@/lib/connectDb";
import { pusher } from "@/lib/pusher";
import Gigs from "@/models/gigs";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { userid, currentId } = await req.json();
  console.log(userid);
  let gigId = params.id;
  try {
    const newGig = await Gigs.findById(params.id);
    if (newGig.isPending === true || newGig.postedBy.equals(userid)) {
      return NextResponse.json({
        gigstatus: "false",
        message: "Cannot Book this Gig,already booked? ",
      });
    }
    await newGig.updateOne(
      {
        $set: {
          isPending: true,
          bookedBy: userid,
        },
      },
      { new: true }
    );
    pusher.trigger("gigs", "gig-booked", newGig);

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
