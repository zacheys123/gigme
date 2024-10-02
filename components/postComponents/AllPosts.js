"use client";
import React, { useEffect, useState, useOptimistic, useRef } from "react";
import SinglePost from "./SinglePost";
import { usePosts } from "@/hooks/usePosts";
import { ArrowBigUp } from "lucide-react";
import { AddAPhoto, ArrowCircleUpRounded } from "@mui/icons-material";
import ScrollToTopButton from "../ScrollToTopButton";
import Link from "next/link";
import { useGlobalContext } from "@/app/Context/store";
import useStore from "@/app/zustand/useStore";

const AllPosts = ({ userposts, comments, replies, user }) => {
  const { posts } = usePosts(user?.user?._id);

  const [optimisticePosts, setOptimisticePosts] = useState(userposts);
  console.log(userposts);
  const [allposts, setposts] = useState([]);
  const lastPostRef = useRef(null);

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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // For smooth scrolling effect
    });
  };
  const { showPosts, setShowPosts } = useStore();
  console.log(userposts);
  return (
    <div id="top">
      {!showPosts && (
        <div className="text-white  h-full scroll-smooth ">
          {userposts?.map((post, index) => {
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

          <div
            style={{
              position: "fixed",
              bottom: "70px",
              right: "20px",
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "50%",
              padding: "10px",
              border: "none",
              cursor: "pointer",
            }}
            className="z-50  absolute bg-blue-700 text-white bottom-[70px] right-10 "
            onClick={handleScrollToTop}
          >
            {" "}
            {/* <ScrollToTopButton />
            <> */}
            <ArrowCircleUpRounded onClick={handleScrollToTop} size="30px" />
          </div>
          <div
            style={{
              position: "fixed",
              bottom: "125px",
              right: "20px",
              color: "#fff",
              borderRadius: "50%",
              padding: "10px",
              border: "none",
              cursor: "pointer",
            }}
            className="z-50  absolute bg-neutral-300 text-white bottom-[125px] right-10 "
          >
            <AddAPhoto
              sx={{ color: "blue" }}
              size="44px"
              onClick={() => setShowPosts(true)}
            />
          </div>
        </div>
      )}
    </div>
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
