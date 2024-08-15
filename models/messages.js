import mongoose from "mongoose";
import { models, Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reciever: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: {
      type: String,
      required: true,
    },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Message = models.Message || mongoose.model("Message", messageSchema);

export default Message;
