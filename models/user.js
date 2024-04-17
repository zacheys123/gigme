import mongoose from "mongoose";
import { models, Schema } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      lowercase: true,
    },
    lastname: { type: String, lowercase: true },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    city: { type: Schema.Types.ObjectId, ref: "user" },
    instrument: { type: Schema.Types.ObjectId, ref: "user" },
    experience: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    phone: {
      type: { type: String },
    },
    verification: {
      type: { type: String },
    },

    username: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    gigPosts: {
      type: [{ type: Schema.Types.ObjectId, ref: "gigs" }],
      default: [],
    },

    isTaken: { type: Schema.Types.ObjectId, ref: "gigs" },
  },
  { timestamps: true }
);
const User = models.User || mongoose.model("User", userSchema);

export default User;
