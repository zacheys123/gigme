import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { follower } = await req.json();

  console.log(params.id);
  console.log(follower);

  try {
    await connectDb();

    const newUser = await User.findByIdAndUpdate(params.id, {
      $push: { followers: follower },
    });

    return NextResponse.json({ result: newUser, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
}

//       .then((err, userd) => { if (err) {
//     return NextResponse.json({ error: err, status: 422 });
//   }
//   User.findByIdAndUpdate(
//     follower,
//     {
//       $push: { followings: params.id },
//     },
//     { new: true }
//   );
//   return NextResponse.json({ userd, status: 200 });
// })
// .catch((err) => {
//   return NextResponse.json({ error: err, status: 422 });
// });
