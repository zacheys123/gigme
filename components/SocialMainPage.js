import React from "react";
import UserPost from "./postComponents/UserPost";
import AllPosts from "./postComponents/AllPosts";
import { checkEnvironment } from "@/utils";
async function getPosts() {
  try {
    const res = await fetch(`${checkEnvironment()}/api/posts/getPosts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const posts = await res.json();

    return posts;
  } catch (error) {
    console.log(error);
  }
}
const SocialMainPage = async ({ user, posts, comments, replies }) => {
  // Fetching data for all posts
  const allPosts = await getPosts();
  return (
    <div
      className="element-with-scroll w-full h-full overflow-y-scroll"
      style={{ scrollbarColor: "grey", scrollbarWidth: "thin" }}
    >
      <UserPost user={user} userposts={posts} />
      {/*All Posts displayed here */}
      <AllPosts
        userposts={allPosts}
        user={user}
        comments={comments}
        replies={replies}
      />
    </div>
  );
};

export default SocialMainPage;
