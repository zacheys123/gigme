import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  console.log(params);
  try {
    await connectDb();
    let currentuser = await User.find()
      .collation({ locale: "en", strength: 2 })
      .exec();
    currentuser = currentuser.filter((user) => {
      if (user?.clerkId.includes(params.id)) {
        return null;
      }
      return currentuser;
    });

    return NextResponse.json({ currentuser });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
