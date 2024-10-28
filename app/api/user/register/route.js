import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = auth();
    const body = await req.json(); // Ensure this resolves correctly
    const { user } = body;

    console.log("Parsed user from request:", user);

    if (!userId) {
      return NextResponse.json({
        userstatus: "error",
        message: "User ID not found",
      });
    }

    await connectDb();

    const existingUser = await User.findOne({
      $or: [
        { clerkId: userId },
        { email: user?.emailAddresses[0]?.emailAddress },
      ],
    });
    const updateUser = await User.findOneAndUpdate(
      { clerkId: userId, email: user?.emailAddresses[0]?.emailAddress },
      {
        $set: {
          firstname: user?.firstName,
          lastname: user?.lastName,
          picture: existingUser?.picture
            ? existingUser?.picture
            : user?.imageUrl,
          email: user?.emailAddresses[0]?.emailAddress,
          username: user?.username,
          phone: user?.phoneNumbers[0]?.phoneNumber,
          verification: user?.emailAddresses[0]?.verification?.status,
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
        firstname: user?.firstName,
        lastname: user?.lastName,
        picture: existingUser?.picture ? existingUser?.picture : user?.imageUrl,
        email: user?.emailAddresses[0]?.emailAddress,
        username: user?.username,
        phone: user?.phoneNumbers[0]?.phoneNumber,
        verification: user?.emailAddresses[0]?.verification?.status,
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
