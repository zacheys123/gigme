"use client";
import { global } from "@/actions";
import { useGlobalContext } from "@/app/Context/store";
import {
  differenceInMinutes,
  getComments,
  getDisLikes,
  getLikes,
  handleRouting,
} from "@/utils";
import { Avatar, Box, CircularProgress } from "@mui/material";
import { TextInput } from "flowbite-react";
import { Globe, Heart, LucideMessageCircleHeart } from "lucide-react";
import Image from "next/image";

import React, { useCallback, useEffect, useState, useOptimistic } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import Comments from "./Comments";
import HeaderDetails from "./HeaderDetails";

import LikeDisLikeComponent from "./LikeDisLikeComponent";
import AvatarComponent from "../Avatar";
import { motion, MotionConfig } from "framer-motion";
import Video from "../Video";
import { Separator } from "../ui/separator";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import useStore from "@/app/zustand/useStore";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
const SinglePost = ({ post, user, comments, replies }) => {
  let newComm = comments?.comments;
  let myuser = user?.user;

  const { menu, setMenu } = useStore();

  let myComments = newComm?.filter((com) => {
    return com?.postId?._id === post?._id;
  });
  console.log(post);
  console.log(post?.media);

  const { userId } = useAuth();
  let username = "text-[11px]   text-blue-300 font-bold";
  let globe = "text-[10px]";
  let posted = "text-neutral-400 font-mono text-[13px] md:text-[15px]";

  const [activePostId, setActivePostId] = useState(null);

  const togglePost = (postId) => {
    if (activePostId === postId) {
      setActivePostId(null); // Close the div if it's already open
    } else {
      setActivePostId(postId); // Open the div for the clicked post
    }
  };
  console.log(comments);
  return (
    <motion.div
      initial={{ opacity: 0, y: ["15px"], x: ["-10px"] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={
        post?.media
          ? " h-[890px] shadow-sm shadow-slate-700 rounded-sm my-6 relative"
          : " h-fit shadow-sm shadow-slate-800 my-6"
      }
    >
      {/* displaying title and the rest of the post */}
      <Box className="flex flex-col rounded-md p-3  element-with-scroll">
        {post && (
          <div className={post?.media ? " w-full " : "mt-3"}>
            <div className="w-full flex justify-between items-center p-2 border border-t-0 border-r-0 border-l-0 border-b-slate-800">
              <div className="flex items-center gap-3">
                {/* <AvatarComponent user={post?.postedBy[0]} /> */}
                {post?.postedBy[0]?.picture ? (
                  <Image
                    className="w-[35px] h-[35px] object-cover rounded-full"
                    src={post?.postedBy[0]?.picture}
                    alt="Profile picture"
                    width={35}
                    height={35}
                  />
                ) : (
                  <AvatarComponent user={post?.postedBy[0]} />
                )}
                {/* username here */}
                <span className={username}>{handleRouting(post, userId)}</span>
              </div>
              <button
                onClick={() => togglePost(post._id)}
                className="bg-neutral-500 p-2 rounded-full"
              >
                <BsThreeDotsVertical onClick={() => togglePost(post?.id)} />
              </button>
            </div>
            {activePostId === post.id && (
              <div className=" bg-gray-300 z-50">
                <p>edit</p>
              </div>
            )}
            <Video post={post} myuser={myuser} myComments={myComments} />
          </div>
        )}
        {/* {!post?.media?.includes("video") && (
            <div>
              <Image className="object-fill  w-full" src="" alt="post image" />
            </div>
          )} */}
      </Box>
      {/* likes and dislikes */}

      {/* comment section */}
      {/* {!showComments ? (
        <div
          className="flex flex-col h-[170px] bg-slate-800 rounded-xl mb-5 px-2  hover:bg-slate-600 cursor-pointer transition-all duration-500"
          onClick={() =>
            // setUserState({ type: global.SHOWCOMMENTS, payload: !showComments })
            setShowComments((prev) => !prev)
          }
        >
          <h6 className="text-neutral-300 text-[13px] my-1">
            {getComments(commentsArray, commentLength)}
          </h6>
          <div className="flex mt-1 items-center mb-3">
            {randComment()?.postedBy?.picture && (
              <AvatarComponent
                usercomm={randComment()?.postedBy}
                posts="w-[20px] h-[20px] rounded-full object-fit"
              />
            )}{" "}
            <h6 className="text-[13px]  text-neutral-300 ml-2">
              {randComment()?.text}
            </h6>
          </div>
        </div>
      ) : (
        <>
          <section className="w-full h-full overflow-auto -mt-1 bg-neutral-slate-600">
            <div className="flex justify-between items-center">
              <FaArrowLeft
                onClick={() =>
                  // setUserState({
                  //   type: global.SHOWCOMMENTS,
                  //   payload: !showComments,
                  // })
                  setShowComments((prev) => !prev)
                }
              />
              <h6 className="text-neutral-300 text-[13px]">
                {getComments(commentsArray, commentLength)}
              </h6>{" "}
              {!commentLoad ? "" : <CircularProgress size="16px" />}
            </div>
            <div>
              {commentsArray &&
                commentsArray
                  ?.map((comment) => {
                    return (
                      <Comments
                        key={comment?._id}
                        comment={comment}
                        user={user}
                        replies={replies}
                      />
                    );
                  })
                  .reverse()}
            </div>
            <form className="w-full relative h-full" onSubmit={handleComment}>
              <input
                id="post"
                type="text"
                placeholder="Add a comment...."
                required
                value={comm}
                onChange={(ev) => setComm(ev.target.value)}
                className="w-[98%] text-[12px]  h-[30px] bottom-0 absolute rounded-xl   outline-none mx-auto focus-within:ring-0 bg-inherit font-mono placeholder-sky-500"
              />
            </form>
          </section>
        </>
      )} */}
    </motion.div>
  );
};

export default SinglePost;
