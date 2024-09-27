import React from "react";
import UserPost from "./postComponents/UserPost";
import AllPosts from "./postComponents/AllPosts";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
import { getAllPosts } from "@/app/server-actions/getAllPosts";

async function getUsersPosts() {
  try {
    const res = await fetch(`${checkEnvironment()}/api/posts/getusersposts`, {
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

const SocialMainPage = async ({ currentuser, comments, replies }) => {
  // Fetching data for all posts

  const myposts = await getUsersPosts();
  const posts = await getAllPosts();

  return (
    <div
      className="element-with-scroll w-full h-full overflow-y-scroll"
      style={{ scrollbarColor: "grey", scrollbarWidth: "thin" }}
    >
      <UserPost user={currentuser} userposts={posts} />
      {/*All Posts displayed here */}
      <AllPosts
        userposts={posts}
        comments={comments}
        replies={replies}
        // myposts={myposts}
        user={currentuser}
      />
    </div>
  );
};

export default SocialMainPage;
