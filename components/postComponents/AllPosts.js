"use client";
import React, { useEffect, useState, useOptimistic, useRef } from "react";
import SinglePost from "./SinglePost";
import { PropTypes } from "prop-types";
import {
  AddAPhoto,
  ArrowBack,
  ArrowCircleUpRounded,
} from "@mui/icons-material";

import useStore from "@/app/zustand/useStore";
import { motion } from "framer-motion";

import Comments from "./Comments";
const AllPosts = ({ userposts, comments, replies, user }) => {
  const {
    showPosts,
    setShowPosts,
    setShowComments,
    showComments,
    currentpost,
  } = useStore();

  //   current comment

  let newComm = comments?.comments;
  let myComments = newComm.filter((com) => {
    return com?.postId?._id === currentpost?._id;
  });
  //   getting the replies a specific comment

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // For smooth scrolling effect
    });
  };
  //
  const inptref = useRef();
  function formatCommentsCount(count) {
    if (count < 1000) return count;
    if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K"; // Formats as "1K", "2.5K", etc.
    }
    return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // For million comments
  }
  const [commentsArray, setComments] = useState(myComments);

  // user data
  useEffect(() => {
    const myComments = comments?.comments.filter(
      (com) => com?.postId?._id === currentpost?._id
    );
    setComments(myComments);
  }, [comments, currentpost]);

  const [commentInputs, setCommentInputs] = useState({});
  // loading state triggered when creating a new comment
  const handleCommentChange = (e, postId) => {
    const { value } = e.target;
    // Update the comment input value for the specific post
    setCommentInputs({
      ...commentInputs,
      [postId]: value,
    });
  };
  const [commentLoad, setComentLoad] = useState();
  const [commlength, setCommLength] = useState(commentsArray?.length);
  function calcComments() {
    setCommLength((prev) => prev + 1);
  }
  const handleComment = async (ev) => {
    ev.preventDefault();
    // get value of input

    setComentLoad(true);
    try {
      const newComment = {
        text: commentInputs[currentpost._id],
        postedBy: user?.user,
        createdAt: new Date().toISOString(),
        _id: Math.random().toString(36).substring(7), // Temporary ID until real one is returned
      };
      calcComments();
      setComments((commentsArray) => [...commentsArray, newComment]);
      setCommentInputs({
        ...commentInputs,
        [currentpost._id]: "", // Updated to use currentpost._id
      });

      // Clear the input field
      if (inptref?.current) {
        inptref.current.value = "";
      }
      const dataInfo = {
        text: commentInputs[currentpost._id],
        postedBy: user?.user?._id,
        post: currentpost?._id,
      };
      console.log(dataInfo);
      const res = await fetch(
        `/api/comments/createComment/${currentpost?._id}`,
        {
          method: "POST",
          "Content-Type": "application/json",
          body: JSON.stringify(dataInfo),
        }
      );

      const data = await res.json();
      console.log(data);
      setComments((prev) => {
        return prev.map((comment) => {
          if (comment._id === newComment._id) {
            return data?.results[0];
          }
          return comment;
        });
      });
      calcComments();
      setComentLoad(false);
    } catch (error) {
      console.log("error commenting", error);
    }
  };
  // const setPostLike = () => {
  //   handleLike(deplike, user?.user?._id, setLikelength, setLike);
  // };
  // const setPostUnLike = () => {
  //   handleUndislike(depunlike, user?.user?._id, setLikelength, setLike);
  // };
  console.log(inptref?.current?.value);
  return (
    <>
      {!showComments ? (
        <div id="top">
          {!showPosts && (
            <div className="text-white  h-full scroll-smooth ">
              {userposts?.map((post, index) => {
                return (
                  <SinglePost
                    key={post?._id}
                    post={post}
                    user={user}
                    replies={replies}
                    comments={comments}
                  />
                );
              })}

              <div
                style={{
                  position: "fixed",
                  bottom: "130px",
                  right: "20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                className="z-50  absolute bg-blue-700 text-white bottom-[130px] right-10 opacity-85 "
                onClick={handleScrollToTop}
              >
                {" "}
                {/* <ScrollToTopButton />
            <> */}
                <ArrowCircleUpRounded onClick={handleScrollToTop} size="30px" />
              </div>
              <div
                initial={{ opacity: 0, y: ["15px"] }}
                whileinview={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  position: "fixed",
                  bottom: "200px",
                  right: "20px",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                className="z-50  absolute bg-neutral-300 text-white bottom-[200px] right-10 opacity-85 "
              >
                <AddAPhoto
                  sx={{ color: "blue" }}
                  size="44px"
                  onClick={() => setShowPosts(true)}
                />
              </div>
            </div>
          )}{" "}
          <motion.footer
            initial={{ opacity: 0, y: ["25px"] }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full  my-5 py-3 text-center text-gray-500"
          >
            <p>© 2024 gigUp. All rights reserved.</p>
          </motion.footer>
        </div>
      ) : (
        <div className="h-[100vh] w-full p-3  ">
          <div className="flex justify-between items-center  h-[10vh] shadow-md shadow-neutral-600 ">
            {" "}
            <ArrowBack
              sizxe="16px"
              sx={{ color: "white" }}
              onClick={() => setShowComments(false)}
            />
            <h6 className="text-gray-300" size="16px">
              {" "}
              {formatCommentsCount(commentsArray.length || commlength)} comments
            </h6>
          </div>
          <div className="h-[70vh]  overflow-y-auto  ">
            {commentsArray ? (
              commentsArray
                ?.map((comment, index) => (
                  <Comments
                    key={comment?._id}
                    comment={comment}
                    user={user}
                    replies={replies}
                    comments={comments}
                  />
                ))
                .reverse()
            ) : (
              <div className="h-[75vh] flex justify-center items-center">
                <h6 className="text-neutral-400">
                  No comments available for this post
                </h6>
              </div>
            )}
          </div>
          <div className="h-[10vh]  fixed  w-[95%] ">
            <form
              className=" w-[95%] mx-auto fixed "
              onSubmit={(ev) => handleComment(ev)}
            >
              <input
                ref={inptref}
                type="text"
                placeholder="Add a comment here....."
                className="text-blue-300 title h-full  w-full   border-zinc-300 focus-within:ring-o outline-none bg-neutral-600 p-2 rounded-sm "
                value={commentInputs[currentpost._id] || ""} // Default to empty string if no comment yet
                onChange={(e) => handleCommentChange(e, currentpost._id)} // Pass postId to update the correct input
              />
            </form>
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default AllPosts;
AllPosts.propTypes = {
  userposts: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  replies: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
};
// const uniqueIds = [...new Set(otherdata.map((obj) => obj.postedBy?._id))];

// console.log(uniqueIds);

// const filteredobj = uniqueIds.reduce((acc, id) => {
//   acc[id] = otherdata.filter((obj) => obj.postedBy?._id === id);
//   return acc;
// }, {});
// console.log(Object.keys(filteredobj).filter((k) => k === uniqueIds));

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
