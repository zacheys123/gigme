import mongoose from "mongoose";

export const connectDb = async () => {
  let isconnected = false;
  mongoose.set(("strictQuery", true));
  try {
    if (isconnected) {
      console.log("Mongoose already connected");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "chat-app",
      useNewUrlParser: true,
    });
    isconnected = true;
    console.log("CONNECTED TO DATABASE");
  } catch (error) {
    console.log("ERROR CONNECTING TO DATABASE", error);
  }
};
