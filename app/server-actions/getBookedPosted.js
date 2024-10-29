import connectDb from "@/lib/connectDb";
import User from "@/models/user";

export async function getBookedPosted(id) {
  try {
    await connectDb();
    const user = await User.findById(id);

    return user;
  } catch (error) {
    console.log("error getting posted or booked By", error);
  }
}
