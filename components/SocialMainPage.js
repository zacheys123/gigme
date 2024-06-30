import React from "react";
import UserPost from "./postComponents/UserPost";
import AllPosts from "./postComponents/AllPosts";

const SocialMainPage = ({ user, posts }) => {
  console.log(posts);
  return (
    <>
      <div className="w-full">
        <UserPost user={user} />
        {/*All Posts displayed here */}
        <AllPosts userposts={posts} />
      </div>
    </>
  );
};

export default SocialMainPage;
