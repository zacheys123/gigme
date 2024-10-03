import React, { useEffect, useState } from "react";
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
import { useRef } from "react";
const Video = ({ post }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true); // Start playing when in view
        } else {
          setIsPlaying(false); // Pause when out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the player is in view
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, []);
  return (
    <div
      className={
        post?.media
          ? "player-container   w-[100%] flex flex-col  gap-4 h-[620px] "
          : "h-fit player-container   w-[100%] flex flex-col  gap-4"
      }
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full   mb-10 flex-1"
        ref={videoContainerRef}
      >
        {post?.media ? (
          <ReactPlayer
            ref={playerRef}
            url={post?.media}
            playing={isPlaying}
            className="w-full  h-auto -mt-2  object-fill shadow-sm "
            controls // Show controls
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
        <div className="w-full border border-slate-800"></div>
        <div className="flex flex-col gap-2 my-3   rounded-md p-3">
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
