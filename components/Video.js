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
const Video = ({ post }) => {
  const [menu, setMenu] = useState();
  return (
    <div
      className="player-container   w-[100%] flex flex-col  gap-4 h-[580px]
     "
    >
      <div className=" w-[100vw] flex justify-between mt-2 bg-slate-900 shadow-md shadow-zinc-700 p-2 rounded-md">
        <div className="user-info ">
          {post?.postedBy[0] ? (
            <Image
              src={post?.postedBy[0]?.picture}
              alt={post?.postedBy[0]?.username}
              className="profile-image"
              width={30}
              height={30}
            />
          ) : (
            <Avatar />
          )}

          {/* <AvatarComponent usercomm={post?.postedBy[0]} /> */}
          <span className="title">{post?.postedBy[0]?.username}</span>
        </div>
        {menu ? (
          <BsThreeDotsVertical onClick={() => setMenu((prev) => !prev)} />
        ) : (
          <BsThreeDots onClick={() => setMenu((prev) => !prev)} />
        )}
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full   mb-10 flex-1"
      >
        <ReactPlayer
          url={post?.media}
          className="w-full  h-full -mt-10"
          controls // Show controls
          autoPlay
          width="100%"
          quality="auto"
          height="100%"
          // Show a thumbnail before playing
        />{" "}
        <div className="flex flex-col gap-2 my-3 shadow-md bg-slate-800/80 rounded-md p-3">
          {" "}
          <div className=" text-neutral-300 text-[13px] line-clamp-3">
            {post?.title}
          </div>
          <div className="title text-red-500">#{post?.description}</div>
          <div className="flex items-center  gap-7 mb-2">
            <div className="flex items-center gap-1">
              <span>1</span> <Heart size="18px" />
            </div>
            <div className="flex items-center gap-1">
              <span>1.5k</span>{" "}
              <ChatBubbleOutline size="18px" sx={{ fontSize: "18px" }} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Video;
