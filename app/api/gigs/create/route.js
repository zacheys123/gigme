import connectDb from "@/lib/connectDb";
import { pusher } from "@/lib/pusher";

import Gigs from "@/models/gigs";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  console.log(data);
  const { userId } = auth();
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  try {
    await connectDb();

    const existingSecret = await Gigs.findOne({
      secret: data?.gigInputs?.secret,
    });
    if (
      data?.dataInfo?.bandCategory.length > 0 &&
      data?.dataInfo?.category.length > 0
    ) {
      return NextResponse.json({
        gigstatus: "false",
        message: "Cannot submit both individual and other category,choose one",
      });
    }
    if (existingSecret) {
      return NextResponse.json({
        gigstatus: "false",
        message: "Secret is Not Secure or it already exists",
      });
    }

    let gigId = existingSecret?._id;
    const newGig = await Gigs.create({
      title: data?.dataInfo?.title,
      description: data?.dataInfo?.description,
      phone: data?.dataInfo?.phoneNo,
      price: data?.dataInfo?.price,
      category:
        data?.dataInfo?.bandCategory.length > 0 ? "" : data?.dataInfo?.category,
      location: data?.dataInfo?.location,
      date: data?.dataInfo?.date,
      time: {
        to: data?.dataInfo?.to,
        from: data?.dataInfo?.from,
      },
      secret: data?.dataInfo?.secret,
      postedBy: data?.dataInfo?.postedBy,
      bussinesscat: data?.dataInfo?.bussinesscat,
      bandCategory:
        data?.dataInfo?.category.length > 0 ? "" : data?.dataInfo?.bandCategory,
    });
    pusher.trigger("gigs-chanel", "gig-created", { newGig });
    // const gig = await Gigs.find({ postedBy: newGig.postedBy })
    //   .populate({ path: "bookedBy", model: User })
    //   .collation({ locale: "en", strength: 2 })
    //   .exec();

    return NextResponse.json({
      gigstatus: "true",
      message: "Created Gig successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      errorstatus: "error",
      message: error,
    });
  }
}
