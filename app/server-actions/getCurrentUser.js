import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { checkEnvironment } from "@/utils";
import { NextResponse } from "next/server";

export const getCurrentUser = async (userId) => {
  try {
    const res = await fetch(
      `${checkEnvironment()}/api/user/getuser/${userId.id}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
