import mongoose from "mongoose";
import { models } from "mongoose";
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
    },
    lastname: { type: String, required: true },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    city: { type: mongoose.Schemas.Types.ObjectId, ref: "user" },
    instrument: { type: mongoose.Schemas.Types.ObjectId, ref: "user" },
    experience: {
      type: mongoose.Schemas.Types.ObjectId,
      ref: "user",
    },
    phone: {
      type: String,
    },

    username: {
      type: String,
      require: true,
      unique: true,
    },
    gigPosts: {
      type: [{ type: mongoose.Schemas.Types.ObjectId, ref: "gigs" }],
      default: [],
    },

    isTaken: { type: mongoose.Schemas.Types.ObjectId, ref: "gigs" },
  },
  { timestamps: true }
);
const User = models.User || mongoose.model("User", userSchema);

export default User;
