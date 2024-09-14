import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  console.log(params);
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({
      updateStatus: false,
      message: "url required",
    });
  } else {
    try {
      await connectDb();
      const user = await User.findByIdAndUpdate(
        { _id: params.id },
        {
          $set: {
            picture: url,
          },
        }
      );
      return NextResponse.json({
        updateStatus: true,
        message: "Image Uploaded successfully",
        userData: user,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        updateStatus: false,
        message: error,
      });
    }
  }
}
