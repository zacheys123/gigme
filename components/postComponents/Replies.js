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
import {
  differenceInMinutes,
  getDisLikes,
  getLikes,
  handleRouting,
} from "@/utils";
import { useAuth } from "@clerk/nextjs";
import LikeDisLikeComponent from "./LikeDisLikeComponent";
const Replies = ({ replies, username, posted, myuser }) => {
  const { userId } = useAuth();

  return (
    <Box className="bg-inherit shadow-xl h-[120px] rounded-sm w-full p-2  mt-2 ml-5 ">
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
        <h6 className={username}>{handleRouting(replies, userId)}</h6>
        <h5 className={posted}>{differenceInMinutes(replies, new Date())}</h5>
      </div>
      <div className="flex  flex-col ">
        <h6 className="text  text-neutral-500 m-2 ">{replies?.text}</h6>

        {/* likes and dislikes */}
        <Box className="w-full flex  justify-center">
          <div className="flex gap-6 items-center  ">
            {/* <LikeDisLikeComponent
              apiroute={replies}
              myuser={myuser}
              mydep="reply"
              api="Reply"
            /> */}
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default Replies;
