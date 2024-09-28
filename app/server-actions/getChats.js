import connectDb from "@/lib/connectDb";
import Chat from "@/models/chat";
import User from "@/models/user";

export async function getChats(params) {
  const userId = params;

  try {
    await connectDb();
    // Find all chats where the user ID is in the participants array
    const chats = await Chat.find({ users: userId })
      .populate({
        path: "users",
        select: "firstname email picture",
        model: User,
      })
      .lean();

    // Respond with the chats
    return chats;
  } catch (error) {
    console.log("error getting user chats in server action", error);
  }
}
