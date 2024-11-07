import connectDb from "@/lib/connectDb";
import Gigs from "@/models/gigs";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import moment from "moment";

async function validateRequest(userId, rating, comment, id, req) {
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (!rating) {
    return NextResponse.json({
      gigstatus: "false",
      message: "Rating is required",
    });
  }
  if (!comment) {
    return NextResponse.json({
      gigstatus: "false",
      message: "You have to Comment",
    });
  }
  return null;
}

async function findGigAndUsers(id) {
  await connectDb();
  const gig = await Gigs.findById({ _id: id });
  if (gig?.isPending === true && gig?.isTaken === true) {
    return { error: "Cannot Review this Gig" };
  }
  const booker = await User.findById({ _id: gig?.bookedBy?._id });
  const poster = await User.findById({ _id: gig?.postedBy?._id });
  return { gig, booker, poster };
}

async function saveReview(booker, poster, rating, comment, id) {
  const reviewData = {
    rating,
    comment,
    gigId: id,
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString(),
  };

  await booker.updateOne({ $push: { allreviews: reviewData } }, { new: true });
  await poster.updateOne({ $push: { myreviews: reviewData } }, { new: true });
}

export async function PUT(req, { params }) {
  const { userId } = auth();
  const { comment, rating } = await req.json();
  const id = params.id;

  const validationResponse = await validateRequest(
    userId,
    rating,
    comment,
    id,
    req
  );
  if (validationResponse) return validationResponse;

  const { booker, poster, error } = await findGigAndUsers(id);
  if (error) {
    return NextResponse.json({ gigstatus: "false", message: error });
  }

  try {
    await saveReview(booker, poster, rating, comment, id);
    return NextResponse.json({
      gigstatus: "true",
      message: "Reviewed Gig successfully",
      results: {
        review: {
          rating,
          comment,
          gigId: id,
          createdAt: moment().toISOString(),
          updatedAt: moment().toISOString(),
        },
        booker,
        poster,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      gigstatus: "false",
      message: "Error reviewing gig",
    });
  }
}
