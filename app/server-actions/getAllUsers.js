import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { checkEnvironment } from "@/utils";
import { NextResponse } from "next/server";

export async function getAllUsers(id) {
  console.log(id);

  try {
    await connectDb();

    const users = await User.find({ _id: { $ne: id } });

    return users;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
