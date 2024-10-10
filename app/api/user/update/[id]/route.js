import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  console.log(params);
  const { address, instrument, experience, age, month, year, city } =
    await req.json();

  if (!age || !month || !year) {
    return NextResponse.json({
      updateStatus: false,
      message: "Date ,Month and year are required",
    });
  } else if (!city) {
    return NextResponse.json({
      updateStatus: false,
      message: "City is required",
    });
  } else {
    console.log("city", city);
    console.log("year", year);
    console.log("month", month);
    console.log("age", age);
    console.log("experience", experience);
    console.log("instrument", instrument);
    try {
      await connectDb();
      const user = await User.findByIdAndUpdate(
        { _id: params.id },
        {
          $set: {
            instrument,
            experience,
            date: age,
            month,
            year,
            city,
            address,
          },
        }
      );
      return NextResponse.json({
        updateStatus: true,
        message: "Update successfull",
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
