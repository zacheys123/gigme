import connectDb from "@/lib/connectDb";
import Chat from "@/models/chat";
import User from "@/models/user";
import Message from "@/models/messages";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { currentId, postedorbookedById } = await req.json();

  if (!postedorbookedById) {
    console.log("message : ", "UserId not sent");
    return NextResponse.json({
      chatStatus: "false",
    });
  }
  try {
    await connectDb();

    let isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: currentId } } },
        { users: { $elemMatch: { $eq: postedorbookedById } } },
      ],
    })
      .populate({ path: "users", model: User })
      .populate({ path: "latestMessage", model: Message });
    // isChat = await User.populate({
    //   path: "latestMessage",
    // });

    if (isChat.length > 0) {
      return NextResponse.json(isChat[0]);
    } else {
      const chatData = await Chat.create({
        chatName: "sender",
        users: [currentId, postedorbookedById],
      });

      const fullChat = await Chat.findOne({ _id: chatData._id }).populate({
        path: "users",
        model: User,
      });

      return NextResponse.json({
        status: 200,
        chatStatus: "true",
        fullChat,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      errorstatus: "error",
      message: error,
    });
  }
}
