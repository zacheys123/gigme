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
    city: { type: String, lowercase: true },
    date: { type: String, lowercase: true },
    month: { type: String, lowercase: true },
    year: { type: String, lowercase: true },
    address: { type: String, lowercase: true },

    instrument: { type: String, lowercase: true },
    experience: { type: String, lowercase: true },
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
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    followings: [{ type: Schema.Types.ObjectId, ref: "user" }],
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
