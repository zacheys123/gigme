// app/api/save-token/route.js

import connectDb from "@/lib/connectDb";
import User from "@/models/user";

export async function POST(req, {}) {
  await connectDb();
  const { token, userid } = await req.json();

  // Assume you have a logged-in user (replace this with proper user ID fetching)

  try {
    await User.findByIdAndUpdate(userid, { deviceToken: token });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
