import connectDb from "@/lib/connectDb";
import Gigs from "@/models/gigs";
import User from "@/models/user";
import { NextResponse } from "next/server";

// import { sendPushNotification } from "@/lib/firebase/firebaseAdmin";

export async function PUT(req, { params }) {
  const { userid } = await req.json();
  console.log(userid);
  try {
    connectDb();
    const newGig = await Gigs.findById(params.id);
    await newGig.updateOne(
      {
        $set: {
          isPending: false,
          bookedBy: null,
        },
        $pull: {
          viewCount: userid,
        },
      },
      { new: true }
    );
    let currentgig = await Gigs.findById(newGig._id)
      .populate({
        path: "postedBy",
        model: User,
      })
      .populate({
        path: "bookedBy",
        model: User,
      });
    // // Notify Socket.io server directly
    // socket.emit("book-gig", {
    //   _id: currentgig?._id,
    //   title: currentgig?.title,
    //   bookedBy: userid,
    // });
    return NextResponse.json({
      gigstatus: "true",
      message: "canceled Gig successfully",
      results: currentgig,
    });
  } catch (error) {
    console.log(error);
  }
}
