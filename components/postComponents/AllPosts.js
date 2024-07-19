"use client";
import { useGlobalContext } from "@/app/Context/store";
import React, { useEffect, useState } from "react";
import SinglePost from "./SinglePost";

const AllPosts = ({ user, comments, replies }) => {
  const [userposts, setUserPosts] = useState([]);
  async function getPosts() {
    try {
      const res = await fetch(`/api/posts/getPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const posts = await res.json();
      setUserPosts(posts);
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);
  const {
    userState: { showPosts },
    setUserState,
  } = useGlobalContext();
  console.log(userposts);
  return (
    <>
      {!showPosts && (
        <div className="text-white  h-full  ">
          {userposts &&
            userposts?.posts
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
