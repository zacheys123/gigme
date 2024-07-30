"use client";
import { useGlobalContext } from "@/app/Context/store";
import React, { useEffect, useState, useOptimistic } from "react";
import SinglePost from "./SinglePost";

const AllPosts = ({ userposts, user, comments, replies }) => {
  const [optimisticePosts, setOptimisticePosts] = useOptimistic(userposts);
  // async function getPosts() {
  //   try {
  //     const res = await fetch(`/api/posts/getPosts`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const posts = await res.json();
  //     setUserPosts(posts);
  //     return posts;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   getPosts();
  // }, []);
  const {
    userState: { showPosts },
    setUserState,
  } = useGlobalContext();
  console.log(optimisticePosts);
  return (
    <>
      {!showPosts && (
        <div className="text-white  h-full  ">
          {optimisticePosts &&
            optimisticePosts?.posts
              ?.map((post) => {
                return (
                  <SinglePost
                    key={post?._id}
                    post={post}
                    user={user}
                    comments={comments}
                    replies={replies}
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
