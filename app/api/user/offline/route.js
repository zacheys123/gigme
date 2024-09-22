import connectDb from "@/lib/connectDb";
import { pusher } from "@/lib/pusher";
import User from "@/models/user";

export async function POST(req) {
  await connectDb();
  const { userId } = await req.json();

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { isOnline: false },
    { new: true, upsert: true }
  );

  return new Response(JSON.stringify({ status: "offline" }));
}
