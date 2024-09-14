import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId } = auth();
  const user = await currentUser();
  let params = user;

  try {
    await connectDb();
    const existingUser = await User.findOne({
      $or: [
        { clerkId: userId, email: params?.emailAddresses[0]?.emailAddress },
      ],
    });
    const updateUser = await User.findOneAndUpdate(
      { clerkId: userId, email: params?.emailAddresses[0]?.emailAddress },
      {
        $set: {
          firstname: params?.firstName,
          lastname: params?.lastName,
          picture: existingUser.picture
            ? existingUser.picture
            : params?.imageUrl,
          email: params?.emailAddresses[0]?.emailAddress,
          username: params?.username,
          phone: params?.phoneNumbers[0]?.phoneNumber,
          verification: params?.emailAddresses[0]?.verification?.status,
        },
      }
    );
    if (userId && existingUser) {
      console.log("user exists");
      return NextResponse.json({
        userstatus: false,
        message: "User already exists",
        results: updateUser,
      });
    } else {
      const newUser = new User({
        clerkId: userId,
        firstname: params?.firstName,
        lastname: params?.lastName,
        picture: existingUser.picture ? existingUser.picture : params?.imageUrl,
        email: params?.emailAddresses[0]?.emailAddress,
        username: params?.username,
        phone: params?.phoneNumbers[0]?.phoneNumber,
        verification: params?.emailAddresses[0]?.verification?.status,
      });
      const mainUser = await newUser.save();
      return NextResponse.json({
        userstatus: true,
        message: "Success",
        results: mainUser,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      userstatus: "error",
      message: error,
    });
  }
}
