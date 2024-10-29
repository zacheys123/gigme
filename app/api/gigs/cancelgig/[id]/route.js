import connectDb from "@/lib/connectDb";
import Gigs from "@/models/gigs";
import User from "@/models/user";
import { NextResponse } from "next/server";
import ioClient from "socket.io-client"; // Import Socket.io client
// import { sendPushNotification } from "@/lib/firebase/firebaseAdmin";

const socket = ioClient(process.env.NEXT_PUBLIC_PORT); // Connect to the server

export async function PUT(req, { params }) {
  const { userid } = await req.json();
  console.log(userid);
  try {
    const newGig = await Gigs.findById(params.id);
    await newGig.updateOne(
      {
        $set: {
          isPending: false,
          bookedBy: null,
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
    // Notify Socket.io server directly
    socket.emit("book-gig", {
      _id: currentgig?._id,
      title: currentgig?.title,
      bookedBy: userid,
    });
    return NextResponse.json({
      gigstatus: "true",
      message: "canceled Gig successfully",
      results: currentgig,
    });
  } catch (error) {
    console.log(error);
  }
}
