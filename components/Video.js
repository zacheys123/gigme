import React, { useCallback, useEffect, useState } from "react";
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
import { useFetchMessages } from "@/hooks/useFetchMessages";
import { PropTypes } from "prop-types";
import LikeDisLikeComponent from "./postComponents/LikeDisLikeComponent";
const Video = ({ post, myuser, myComments }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoContainerRef = useRef(null);
  const { setShowComments, setCurrentpost } = useStore();
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
  const random = useCallback(() => {
    let arr = myComments;
    return arr[Math.floor(Math.random() * arr?.length)];
  }, [myComments]);
  useEffect(() => {
    setTimeout(() => {
      random();
    }, 3000);
  });
  console.log(random());
  return (
    <section
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
        <div className="flex flex-col gap-4 my-3   rounded-md p-3">
          {" "}
          <div className=" text-neutral-300 text-[13px] line-clamp-3">
            {post?.title}
          </div>
          <div className="title text-red-500">#{post?.description}</div>
          <div className="flex items-center gap-1">
            <LikeDisLikeComponent
              apiroute={post}
              myuser={myuser}
              mydep="posts"
              api="Post"
              comments={myComments}
            />
          </div>
          {myComments && myComments?.length > 0 ? (
            <div
              className="h-[42px] bg-zinc-900 w-full max-w-2xl mx-auto py-2 -mt-4 rounded-xl"
              onClick={() => {
                setCurrentpost(post);
                setShowComments(true);
              }}
            >
              <div className="flex items-center px-2 gap-2">
                <>
                  {random()?.postedBy?.picture ? (
                    <Image
                      className="w-[20px] h-[20px] object-cover rounded-full"
                      src={random()?.postedBy?.picture}
                      alt="Profile picture"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Avatar />
                  )}
                </>
                <div className="flex flex-col ">
                  <span className="gigtitle text-gray-300">
                    {" "}
                    {myComments?.length} comments
                  </span>

                  <motion.div
                    initial={{ opacity: 0, x: ["200px"] }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-neutral-400 text-[11px] lineclam-2"
                  >
                    {random()?.text}
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-neutral-300 text-[11px]">
              No one has liked this yet.
            </div>
          )}
          {/* display the posted at */}
          <div className="flex items-center gap-2 text-neutral-300 text-[11px]">
            {moment(post?.createdAt).fromNow()}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
// proptypes for the post types

Video.propTypes = {
  post: PropTypes.object,
  myuser: PropTypes.object,
  myComments: PropTypes.array,
};
export default Video;
