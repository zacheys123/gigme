"use client";
import { useGlobalContext } from "@/app/Context/store";
import React from "react";
import SinglePost from "./SinglePost";

const AllPosts = ({ userposts, user, comments }) => {
  const {
    userState: { showPosts },
    setUserState,
  } = useGlobalContext();
  console.log(userposts);
  return (
    <>
      {!showPosts && (
        <div className="text-white  h-full  ">
          {userposts?.posts
            .map((post) => {
              return (
                <SinglePost
                  key={post?._id}
                  post={post}
                  user={user}
                  comments={comments}
                />
              );
            })
            .reverse()}
        </div>
      )}
    </>
  );
};

export default AllPosts;
