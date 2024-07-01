"use client";
import { useGlobalContext } from "@/app/Context/store";
import React from "react";
import SinglePost from "./SinglePost";

const AllPosts = ({ userposts }) => {
  const {
    userState: { showPosts },
    setUserState,
  } = useGlobalContext();
  console.log(userposts?.posts);
  return (
    <>
      {!showPosts && (
        <div
          className="text-white overflow-hidden h-full"
          style={{ scrollbarColor: "red yellow", scrollbarWidth: "5px" }}
        >
          {userposts?.posts.map((post) => {
            return <SinglePost key={post?._id} post={post} />;
          })}
        </div>
      )}
    </>
  );
};

export default AllPosts;
