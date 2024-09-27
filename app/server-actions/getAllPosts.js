import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import User from "@/models/user";

export async function getAllPosts(req) {
  try {
    await connectDb();

    const lastPosts = await Post.aggregate([
      {
        $lookup: {
          from: "users", // The name of the related collection
          localField: "postedBy", // The field in the 'posts' collection that references 'users'
          foreignField: "_id", // The field in the 'users' collection
          as: "authorDetails", // The name of the field where the lookup results will be stored
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort posts by creation date in descending order
      },
      {
        $group: {
          _id: "$postedBy", // Group by userId
          lastPost: { $first: "$$ROOT" }, // Get the first (latest) post of each group
        },
      },
      {
        $replaceRoot: { newRoot: "$lastPost" }, // Replace the root with the last post object
      },
    ]);
    return lastPosts;
  } catch (error) {
    console.log({ message: "Error fetching last posts", error });
  }
}
