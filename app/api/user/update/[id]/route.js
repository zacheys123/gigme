import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  console.log(params);
  const { instrument, experience, age, month, year } = await req.json();
  console.log("PUT", instrument, experience, age, month, year);

  if (!instrument || !experience || !age || !month || !year) {
    return NextResponse.json({
      updateStatus: false,
      message: "Please fill in all the fields",
    });
  }
  try {
    await connectDb();
    const user = await User.findByIdAndUpdate(
      { _id: params.id },
      {
        $set: {
          instrument: instrument,
          experience: experience,
          age: age,
          month: month,
          year: year,
        },
      }
    );
    return NextResponse.json({
      updateStatus: true,
      message: "User updated successfully",
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
