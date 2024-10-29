import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { checkEnvironment } from "@/utils";
import { NextResponse } from "next/server";

export async function getAllUsers(id) {
  console.log(id);

  try {
    await connectDb();

    const users = await User.find({ _id: { $ne: id } });

    // Create response with no-store cache
    const response = NextResponse.json(users, { status: 200 });
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

// export async function GET(request) {
//   try {
//     await connectDb();

//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     const users = await User.find({ _id: { $ne: id } });

//     const response = NextResponse.json(users, { status: 200 });
//     response.headers.set("Cache-Control", "no-store");

//     return response;
//   } catch (error) {
//     return NextResponse.json({ message: error }, { status: 500 });
//   }
// }
