import User from "../../models/user";
import connectDb from "../connectDb";

export const createOrUpdateUser = async (req) => {
  const { id, first_name, last_name, image_Url, email_Addresses, username } =
    await req.json();
  console.log(first_name);
  try {
    await connectDb();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstname: first_name,
          lastname: last_name,
          picture: image_Url,
          email: email_Addresses[0].email_address,
          username: username,
        },
      },
      { upsert: true, new: true }
    );

    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await connectDb();
    const user = await User.findOneAndDelete({ clerkId: id });
    return user;
  } catch (error) {
    console.error(error);
    return error;
  }
};
