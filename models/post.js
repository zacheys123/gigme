import mongoose from "mongoose";
import { models, Schema } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      lowercase: true,
    },
    media: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Post = models.Post || mongoose.model("Post", postSchema);

export default Post;
