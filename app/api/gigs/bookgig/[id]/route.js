import connectDb from "@/lib/connectDb";

import Gigs from "@/models/gigs";
import User from "@/models/user";
import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@clerk/nextjs";
import ioClient from "socket.io-client"; // Import Socket.io client
// import { sendFCMNotification } from "@/utils/notifications";
import moment from "moment";
// import { sendPushNotification } from "@/lib/firebase/firebaseAdmin";

const socket = ioClient(process.env.NEXT_PUBLIC_PORT); // Connect to the server

export async function PUT(req, { params }) {
  const { userId } = auth();
  const { userid } = await req.json();
  console.log(userid);
  let gigId = params.id;
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  } // Get the start and end of the current day

  try {
    await connectDb();

    // Find the event and ensure it's not already booked
    const newGig = await Gigs.findOne({ _id: params.id });

    if (newGig?.isPending === true || newGig?.postedBy?.equals(userid)) {
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
        $push: {
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
    // Notify Socket.io server directly
    socket.emit("book-gig", {
      _id: currentgig?._id,
      title: currentgig?.title,
      bookedBy: userid,
    });
    // Notify event owner (optional)

    // if (gigCreator && gigCreator.fcmToken) {
    //   const payload = {
    //     notification: {
    //       title: "Gig Booked!",
    //       body: `Your gig "${currentgig?.title}" was booked!`,
    //     },
    //   };

    //   await sendPushNotification(gigCreator.fcmToken, payload);
    // }
    const creatorId = currentgig.postedBy._id;
    // await sendFCMNotification(
    //   creatorId,
    //   "Your gig was booked!",
    //   `Gig "${currentgig.title}" has been booked.`
    // );
    return NextResponse.json({
      gigstatus: "true",
      message: "Updated Gig successfully",
      results: currentgig,
    });
  } catch (error) {
    console.log(error);
  }
}
