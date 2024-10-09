import mongoose from "mongoose";
import { models, Schema } from "mongoose";

const replySchema = new mongoose.Schema(
  {
    commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Reply = models.Reply || mongoose.model("Reply", replySchema);

export default Reply;
