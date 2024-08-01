import mongoose from "mongoose";
import { models, Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    bookedBy: { type: Schema.Types.ObjectId, ref: "User" },
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
