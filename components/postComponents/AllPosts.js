"use client";
import { useGlobalContext } from "@/app/Context/store";
import React, { useEffect, useState, useOptimistic } from "react";
import SinglePost from "./SinglePost";
import { usePosts } from "@/hooks/usePosts";

const AllPosts = ({ userposts, comments, replies, user }) => {
  const { posts } = usePosts(user?.user?._id);

  const [optimisticePosts, setOptimisticePosts] = useState(userposts);
  console.log(userposts);
  const [allposts, setposts] = useState([]);

  // useEffect(() => {
  //   setOptimisticePosts(userposts);

  //   // Filter to get the latest post per user
  //   const latestPosts = userposts.reduce((acc, post) => {
  //     // Check if the user has already been added
  //     if (!acc.find((p) => p.userId === post.userId)) {
  //       acc.push(post); // Add the first occurrence of this user
  //     }
  //     return acc;
  //   }, []);
  //   setposts(latestPosts);
  // }, [userposts]);
  const {
    userState: { showPosts },
  } = useGlobalContext();
  console.log(userposts);
  return (
    <>
      {!showPosts && (
        <div className="text-white  h-full  ">
          {userposts?.map((post) => {
            return (
              <SinglePost
                key={post?._id}
                post={post}
                user={user}
                comments={comments}
                replies={replies}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default AllPosts;

// const uniqueIds = [...new Set(otherdata.map((obj) => obj.postedBy?._id))];

// console.log(uniqueIds);

// const filteredobj = uniqueIds.reduce((acc, id) => {
//   acc[id] = otherdata.filter((obj) => obj.postedBy?._id === id);
//   return acc;
// }, {});
// console.log(Object.keys(filteredobj).filter((k) => k === uniqueIds));
