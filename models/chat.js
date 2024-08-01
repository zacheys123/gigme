import mongoose from "mongoose";
import { models, Schema } from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    reciever: { type: Schema.Types.ObjectId, ref: "User" },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    gigChat: { type: Schema.Types.ObjectId, ref: "Gig" },
  },
  { timestamps: true }
);
const Chat = models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
