"use client";
import { useGlobalContext } from "@/app/Context/store";
import React, { useEffect, useState, useOptimistic } from "react";
import SinglePost from "./SinglePost";
import { usePosts } from "@/hooks/usePosts";

const AllPosts = ({ userposts, user, comments, replies, myposts }) => {
  const { posts } = usePosts(user?.user?._id);

  const [optimisticePosts, setOptimisticePosts] = useState(userposts);
  const mydata = optimisticePosts?.posts?.filter(
    (post) => post?.postedBy?._id !== user?.user?._id
  );

  const otherdata = optimisticePosts?.posts?.filter(
    (post) => post?.postedBy?._id !== user?.user?._id
  );

  const uniqueIds = [...new Set(otherdata.map((obj) => obj.postedBy?._id))];

  console.log(uniqueIds);

  const filteredobj = uniqueIds.reduce((acc, id) => {
    acc[id] = otherdata.filter((obj) => obj.postedBy?._id === id);
    return acc;
  }, {});
  console.log(Object.keys(filteredobj).filter((k) => k === uniqueIds));

  const {
    userState: { showPosts },
  } = useGlobalContext();
  return (
    <>
      {!showPosts && (
        <div className="text-white  h-full  ">
          {mydata
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
