import { pusher } from "@/lib/pusher";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { socket_id, channel_name, user_id } = await req.json();

  const presenceData = {
    user_id, // uniquely identify the user
  };

  const auth = pusher.authenticate(socket_id, channel_name, presenceData);
  return NextResponse.json(auth);
}
