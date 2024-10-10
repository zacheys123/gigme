"use client";
import { global } from "@/actions";
import { useGlobalContext } from "@/app/Context/store";
import { getComments, getDisLikes, getLikes, handleRouting } from "@/utils";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: ["15px"], x: ["-10px"] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={
        post?.media
          ? " h-fit shadow-sm shadow-slate-700 rounded-sm my-2 relative"
          : " h-fit shadow-sm shadow-slate-800 my-6"
      }
    >
      {/* displaying title and the rest of the post */}
      <Box className="flex flex-col rounded-md p-3  element-with-scroll">
        {post && (
          <div className={post?.media ? " w-full " : "mt-1"}>
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
      </Box>
    </motion.div>
  );
};

export default SinglePost;
