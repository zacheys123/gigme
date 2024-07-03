"use client";
import Image from "next/image";
import React, { useState } from "react";
import HeaderDetails from "./HeaderDetails";
import { Box, Divider } from "@mui/material";
import {
  differenceInMinutes,
  getDisLikes,
  getLikes,
  getReplys,
  handleRouting,
} from "@/utils";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";
import ReplyModal from "./ReplyModal";
import { useRouter } from "next/navigation";
const Comments = ({ comment, user, replies }) => {
  const { userId } = useAuth();
  const [open, setOpen] = React.useState(false);
  let newRep = replies?.replies;
  const [like, setLike] = useState();
  const [dislike, setdisLike] = useState();
  const [likelength, setLikelength] = useState();
  const [dislikelength, setdisLikelength] = useState();
  const myreplies = newRep?.filter((rep) => {
    return rep?.commentId?._id === comment?._id;
  });
  const [replyarray, setReplyArray] = useState(() =>
    replies?.length < 1 || myreplies === "undefined" ? [] : myreplies
  );
  const [replyLength, setReplyLength] = useState(myreplies?.length);
  let username = "text-[11px]   ml-2 text-blue-300 font-normal";
  let globe = "text-[8px] ";
  let posted = "text-neutral-400 font-mono text-[11px] md:text-[13px] ml-2";
  // creating reply api
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  let dataInfo = { text, postedBy: user?.user?._id };
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };
  function updateReplyLength() {
    return setReplyLength((prev) => prev + 1);
  }
  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/reply/createReply/${comment?._id}`, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(dataInfo),
      });
      const data = await res.json();
      updateReplyLength();
      setReplyArray((replyarr) => [...replyarr, data?.results[0]]);
      console.log(data);
      setText("");
      handleClose();
      setTimeout(() => {
        router.push(`/gigme/social/replies/${comment?._id}`);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  //
  console.log(replyarray);
  return (
    <>
      <ReplyModal
        open={open}
        handleClose={handleClose}
        onSubmit={onSubmit}
        text={text}
        setText={setText}
      />

      <div className="mt-1  shadow-full p-4 rounded-md h-fit  my-5  mx-2 flex flex-col">
        <div className="flex items-center mt-2">
          {comment?.postedBy?.picture && (
            <Image
              alt="profile"
              src={comment?.postedBy?.picture}
              width={20}
              height={20}
              className="w-[20px] h-[20px]  rounded-full"
            />
          )}{" "}
          <h6 className={username}>{handleRouting(comment, userId)}</h6>
          <h5 className={posted}>{differenceInMinutes(comment, new Date())}</h5>
        </div>
        <div className="flex  flex-col ">
          <h6
            onClick={() => router.push(`/gigme/social/replies/${comment?._id}`)}
            className="text-[13px] text-neutral-300 m-2 line-clamp-2 p-2 "
          >
            {comment?.text}
          </h6>

          {/* likes and dislikes */}
          <Box className="w-full flex  justify-center">
            <div className="flex gap-6 items-center  -mt-1">
              <div className="flex  items-center gap-2 text-[10px]">
                {getLikes(post, likelength)}
                {like ? <AiOutlineLike /> : <AiFillLike />}
              </div>
              <div className="flex  items-center gap-2 text-[10px]">
                {getDisLikes(post, dislikelength)}
                {dislike ? <AiOutlineDislike /> : <AiFillDislike />}
              </div>
              <div className="text-[11px]">
                <FaRegCommentAlt onClick={() => setOpen(true)} />
              </div>
            </div>
          </Box>
          {/* reply section */}
          <div className="my-2">
            <h4
              className="text-[11px] text-blue-400 "
              onClick={() =>
                router.push(`/gigme/social/replies/${comment?._id}`)
              }
            >
              {getReplys(replyarray, replyLength)}
            </h4>{" "}
          </div>
        </div>
        <Divider className="bg-neutral-400" />
      </div>
    </>
  );
};

export default Comments;
