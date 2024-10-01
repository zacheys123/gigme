import React, { useState } from "react";
import ReactPlayer from "react-player";

import moment from "moment";
import { Heart } from "lucide-react";
import { ChatBubbleOutline } from "@mui/icons-material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { motion } from "framer-motion";
import AvatarComponent from "./Avatar";
import Image from "next/image";
import { Avatar } from "./ui/avatar";
import { Box } from "@mui/material";
import { Separator } from "./ui/separator";
import useStore from "@/app/zustand/useStore";
const Video = ({ post }) => {
  const { menu, setMenu } = useStore();
  return (
    <div
      className={
        post?.media
          ? "player-container   w-[100%] flex flex-col  gap-4 h-[580px] "
          : "h-fit player-container   w-[100%] flex flex-col  gap-4"
      }
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full   mb-10 flex-1"
      >
        {post?.media ? (
          <ReactPlayer
            url={post?.media}
            className="w-full  h-full -mt-10"
            controls // Show controls
            autoPlay
            width="100%"
            quality="auto"
            height="100%"
            // Show a thumbnail before playing
          />
        ) : (
          <Image
            src=""
            alt=" video here"
            className="profile-image"
            width={30}
            height={30}
          />
        )}
        <div className="flex flex-col gap-2 my-3 shadow-md shadow-slate-800/80 rounded-md p-3">
          {" "}
          <div className=" text-neutral-300 text-[13px] line-clamp-3">
            {post?.title}
          </div>
          <div className="title text-red-500">#{post?.description}</div>
          <div className="flex items-center  gap-7 mb-2">
            <div className="flex items-center gap-1">
              <span className="text-neutral-400 text-[11px]">1</span>{" "}
              <Heart size="18px" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-neutral-400 text-[11px]">1.5k</span>
              <ChatBubbleOutline size="18px" sx={{ fontSize: "18px" }} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Video;
