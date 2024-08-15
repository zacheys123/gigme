import mongoose from "mongoose";
import { models, Schema } from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message", default: [] }],

    gigChat: { type: Schema.Types.ObjectId, ref: "Gig" },
  },
  { timestamps: true }
);
const Chat = models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
