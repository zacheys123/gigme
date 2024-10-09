"use client";
import React, { useEffect, useState } from "react";
import HeaderDetails from "./HeaderDetails";
import Image from "next/image";
import { Box, Divider } from "@mui/material";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import {
  getDisLikes,
  getLikes,
  getReplys,
  handleRouting,
  handleRouting2,
} from "@/utils";
import { useAuth } from "@clerk/nextjs";
import Replies from "./Replies";
import { useRouter } from "next/navigation";
import LikeDisLikeComponent from "./LikeDisLikeComponent";
import moment from "moment";
const ReplyComponent = ({ comment, user }) => {
  const { userId } = useAuth();
  const [replies, setReplies] = useState();
  async function getReplies() {
    try {
      const res = await fetch(`/api/reply/getReplies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const replies = await res.json();
      setReplies(replies);
      return replies;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getReplies();
  }, []);
  const newRep = replies?.replies;
  const myuser = user?.user;
  const router = useRouter();
  function formatReplies(count) {
    if (count < 1000) return count;
    if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K"; // Formats as "1K", "2.5K", etc.
    }
    return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // For million comments
  }
  //   current comment
  let mycomm = comment?.comment;
  //   getting the replies a specific comment
  let myreplies = newRep?.filter((rep) => {
    return rep?.commentId?._id === mycomm?._id;
  });
  const [replyarray, setReplyArray] = useState(myreplies);
  const [replyLength, setReplyLength] = useState(myreplies?.length);
  useEffect(() => {
    // Filter out replies to the current comment

    const myReplies = replies?.replies.filter(
      (rep) => rep?.commentId?._id === mycomm?._id
    );

    setReplyArray(myReplies);
  }, [replies, mycomm]);

  function count() {
    if (formatReplies(replyarray?.length || replyLength) === 0) {
      return "no replies";
    }
    if (formatReplies(replyarray?.length || replyLength) === 1) {
      return formatReplies(replyarray?.length || replyLength) + " reply";
    }
    return formatReplies(replyarray?.length || replyLength) + " replies";
  }
  let username = "  ml-2 text-slate-400 font-normal";
  let globe = "text-[8px] ";
  let posted = "text-neutral-400 font-mono text-[12px] md:text-[15px] ml-2";

  return (
    <div className="flex flex-col">
      <Box className="bg-neutral-200 shadow-lg rounded-md my-2 h-[120px] mx-auto w-[95%]  p-3 top-0 ">
        <div className="flex justify-between">
          <FaArrowLeft
            onClick={() => router.back()}
            sx={{ backgroundColor: "blue" }}
            className="text-red-500 md:cursor-pointer"
          />
          <h6 className="font-mono text-pretty tracking-tight text-[13px]">
            {" "}
            {count()}
          </h6>
        </div>
        <Divider />{" "}
        <div className="flex items-center mt-2">
          {mycomm?.postedBy?.picture && (
            <Image
              alt={mycomm && mycomm?.postedBy?.firstname.split("")[0]}
              src={mycomm?.postedBy?.picture}
              width={20}
              height={20}
              className="w-[25px] h-[25px]  rounded-full"
            />
          )}{" "}
          <h6 className={username}>{handleRouting2(mycomm, userId)}</h6>
          <h5 className={posted}>{moment(mycomm.createdAt).fromNow()}</h5>
        </div>
        <div className="flex  flex-col ">
          <h6 className="comtext text-[13px] text-neutral-600 m-2">
            {mycomm?.text}
          </h6>

          {/* likes and dislikes */}
          <Box className="w-full flex  justify-center"></Box>
        </div>
      </Box>{" "}
      <Divider />
      {/* <section className="overflow-hidden flex justify-center items-center h-[calc(100vh-270px)] bg-neutral-300 flex-col container ">
          no replies available 😪🧐
        </section>
      ) : ( */}
      <section
        className="overflow-scroll element-with-scroll flex
       justify-items-end h-screen bg-neutral-300 flex-col container "
      >
        {replyarray
          ?.map((rep) => {
            return (
              <Replies
                key={rep?._id}
                replies={rep}
                username={username}
                posted={posted}
                myuser={myuser}
              />
            );
          })
          .reverse()}
      </section>
    </div>
  );
};

export default ReplyComponent;
