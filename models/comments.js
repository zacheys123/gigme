import mongoose from "mongoose";
import { models, Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Comment = models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
