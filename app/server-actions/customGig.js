import connectDb from "@/lib/connectDb";
import Gig from "@/models/gigs";
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

export async function getGig(id) {
  try {
    await connectDb();
    const gig = await Gig.findById(id);

    return gig;
  } catch (error) {
    console.log("error getting posted or booked By", error);
  }
}
