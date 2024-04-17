import mongoose from "mongoose";
import { models, Schema } from "mongoose";
const gigsSchema = new mongoose.Schema(
  {
    gigPosts: {
      type: [
        {
          name: {
            type: String,
          },
          location: { type: String, required: true },
          time: {
            type: [
              {
                from: { type: String, required: true, default: Date.now() },
                to: { type: String, required: true, default: Date.now() },
              },
            ],
          },
          phone: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
          isTaken: { type: Boolean, default: false },
        },
      ],
    },
  },
  { timestamps: true }
);
const Gigs = models.User || mongoose.model("Gigs", gigsSchema);

export default Gigs;
