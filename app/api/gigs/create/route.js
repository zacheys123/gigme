import connectDb from "@/lib/connectDb";
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
    if (existingSecret) {
      return NextResponse.json({
        gigstatus: "false",
        message: "Secret is Not Secure or it already exists",
      });
    }
    const newGig = await Gigs.create({
      title: data?.dataInfo?.title,
      description: data?.dataInfo?.description,
      phone: data?.dataInfo?.phoneNo,
      price: data?.dataInfo?.price,
      category:
        data?.dataInfo?.bandCategory.length > 0
          ? null
          : data?.dataInfo?.category,
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
        data?.dataInfo?.category.length > 0
          ? null
          : data?.dataInfo?.bandCategory,
    });
    const getGig = await Gigs.find({ postedBy: newGig.postedBy }).populate({
      path: "postedBy",
      model: User,
    });
    return NextResponse.json({
      gigstatus: "true",
      message: "Created Gig successfully",
      results: getGig,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      errorstatus: "error",
      message: error,
    });
  }
}
