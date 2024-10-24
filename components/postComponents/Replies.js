"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { getDisLikes, getLikes, handleRouting, handleRouting2 } from "@/utils";
import { useAuth } from "@clerk/nextjs";
import LikeDisLikeComponent from "./LikeDisLikeComponent";
import moment from "moment";
import { motion } from "framer-motion";
const Replies = ({ replies, username, posted, myuser }) => {
  const { userId } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: ["25px"] }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="bg-zinc-800 shadow-md shadow-zinc-600 h-fit rounded-md w-full p-1  my-3 ml-5 "
    >
      <div className="flex items-center ">
        {replies?.postedBy?.picture && (
          <Image
            alt={replies && replies?.postedBy?.firstname.split("")[0]}
            src={replies?.postedBy?.picture}
            width={20}
            height={20}
            className="w-[25px] h-[25px]  rounded-full"
          />
        )}{" "}
        <h6 className={username}>{handleRouting2(replies, userId)}</h6>
        <h5 className={posted}>{moment(replies?.createdAt).fromNow()}</h5>
      </div>
      <div className="flex  flex-col ">
        <h6 className="text  text-neutral-200 m-2 ">{replies?.text}</h6>

        {/* likes and dislikes */}
        <Box className="w-full flex  justify-center">
          <div className="flex gap-6 items-center  ">
            <LikeDisLikeComponent
              apiroute={replies}
              myuser={myuser}
              mydep="reply"
              api="Reply"
              comments={replies?.likes}
            />
          </div>
        </Box>
      </div>
    </motion.div>
  );
};

export default Replies;
