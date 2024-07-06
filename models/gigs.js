import mongoose from "mongoose";
import { models, Schema } from "mongoose";

const gigSchema = new mongoose.Schema(
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
    phone: { type: String },
    price: { type: String },
    category: { type: String },
    location: { type: String },
    date: { type: Date, default: new Date() },
    time: {
      from: {
        type: String,
      },
      to: {
        type: String,
        required: true,
      },
    },
    isTaken: { type: Boolean, default: false },
    recomendedStars: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Gig = models.Gig || mongoose.model("Gig", gigSchema);

export default Gig;
