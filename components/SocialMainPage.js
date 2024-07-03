import React from "react";
import UserPost from "./postComponents/UserPost";
import AllPosts from "./postComponents/AllPosts";
import { checkEnvironment } from "@/utils";

const SocialMainPage = ({ user, posts, comments, replies }) => {
  return (
    <div
      className="element-with-scroll w-full h-full overflow-y-scroll"
      style={{ scrollbarColor: "grey", scrollbarWidth: "thin" }}
    >
      <UserPost user={user} userposts={posts} />
      {/*All Posts displayed here */}
      <AllPosts
        userposts={posts}
        user={user}
        comments={comments}
        replies={replies}
      />
    </div>
  );
};

export default SocialMainPage;
