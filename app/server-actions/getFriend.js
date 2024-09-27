import connectDb from "@/lib/connectDb";
import User from "@/models/user";

export async function getFriend(req) {
  try {
    await connectDb();
    const current = await User.findOne({
      username: req,
    });

    return current;
  } catch (error) {
    console.log("Error getting friendsData", error);
  }
}
