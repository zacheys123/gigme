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
import useStore from "@/app/zustand/useStore";
import ReplyModal from "./ReplyModal";
const ReplyComponent = ({ comment, user, replies }) => {
  const { userId } = useAuth();
  const { open, setOpen } = useStore();

  const newRep = replies?.replies;
  const myuser = user?.user;
  const router = useRouter();
  //
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
  const [replyLength, setReplyLength] = useState(replyarray?.length);
  useEffect(() => {
    // Filter out replies to the current comment

    const myReplies = replies?.replies.filter(
      (rep) => rep?.commentId?._id === mycomm?._id
    );

    setReplyArray(myReplies);
    setReplyLength(myReplies?.length);
  }, [replies, mycomm]);

  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  let dataInfo = { text, postedBy: myuser._id };

  const handleClose = () => {
    setOpen(false);
  };
  function updateReplyLength() {
    return setReplyLength((prev) => prev + 1);
  }
  console.log(mycomm?._id);

  // create submi reply route
  const onSubmit = async (ev) => {
    ev.preventDefault();

    try {
      setLoading(true);
      const newReply = {
        text,
        postedBy: myuser,
        createdAt: new Date().toISOString(),
        _id: Math.random().toString(36).substring(7), // Temporary ID until real one is returned
      };
      updateReplyLength();
      setReplyArray((replyarray) => [...replyarray, newReply]);
      setText("");
      const res = await fetch(`/api/reply/createReply/${mycomm?._id}`, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(dataInfo),
      });
      const data = await res.json();

      setReplyArray((prev) => {
        return prev.map((comment) => {
          if (comment._id === newReply._id) {
            return data?.results[0];
          }
          return comment;
        });
      });
      updateReplyLength();
      console.log(data);
      setText("");
      handleClose();
      // setTimeout(() => {
      //   router.push(`/gigme/social/replies/${comment?._id}`);
      // }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  //
  function count() {
    if (
      formatReplies(replyarray?.length ? replyarray?.length : replyLength) === 0
    ) {
      return "no reply";
    }
    if (
      formatReplies(replyarray?.length ? replyarray?.length : replyLength) === 1
    ) {
      return (
        formatReplies(replyarray?.length ? replyarray?.length : replyLength) +
        " reply"
      );
    }
    return (
      formatReplies(replyarray?.length ? replyarray?.length : replyLength) +
      " replies"
    );
  }
  let username = "  ml-2 text-slate-200 font-normal";
  let globe = "text-[8px] ";
  let posted = "text-gray-300 font-mono text-[12px] md:text-[15px] ml-2";
  console.log(mycomm);
  return (
    <>
      <ReplyModal
        open={open}
        handleClose={handleClose}
        onSubmit={onSubmit}
        text={text}
        setText={setText}
      />
      <div className="flex flex-col bg-neutral-900 w-full max-w-2xl ">
        <Box className="bg-zinc-700 shadow-sm shadow-zinc-500 rounded-md my-2 h-[140px] mx-auto w-[95%]  p-3 top-0 ">
          <div className="flex justify-between">
            <FaArrowLeft
              onClick={() => router.back()}
              sx={{ backgroundColor: "blue" }}
              className="text-red-500 md:cursor-pointer"
            />
            <h6 className="font-mono text-pretty tracking-tight text-[13px] text-neutral-300">
              {" "}
              {count()}
            </h6>
          </div>
          <Divider className=" bg-zinc-600" />{" "}
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
            <h6 className={"texxt-[13px] text-slate-300 ml-2"}>
              {handleRouting2(mycomm, userId)}
            </h6>
            <h5 className={"text-[11px] text-gray-400 ml-2"}>
              {moment(mycomm.createdAt).fromNow()}
            </h5>
          </div>
          <div className="flex  flex-col ">
            <h6 className="comtext text-[13px] text-neutral-200 ml-9 m-2">
              {mycomm?.text}
            </h6>

            {/* likes and dislikes */}
            <LikeDisLikeComponent
              myuser={myuser}
              mydep="comments"
              api="Comment"
              setOpen={setOpen}
              comments="replycomment"
              mydep2={mycomm}
            />
            <Box className="w-full flex  justify-center"></Box>
          </div>
        </Box>{" "}
        <Divider />
        {/* <section className="overflow-hidden flex justify-center items-center h-[calc(100vh-270px)] bg-neutral-300 flex-col container ">
          no replies available 😪🧐
        </section>
      ) : ( */}
        {replyarray?.length > 0 ? (
          <section
            className="overflow-scroll element-with-scroll flex
       justify-items-end h-screen bg-neutral-800 flex-col container "
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
        ) : (
          <div className="flex h-screen overflow-hidden justify-center items-center">
            <h6 className="text-center text-neutral-400 text-lg -mt-[25px]">
              No replies available
            </h6>
          </div>
        )}
      </div>
    </>
  );
};

export default ReplyComponent;
