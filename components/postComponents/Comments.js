"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HeaderDetails from "./HeaderDetails";
import { Box, Divider } from "@mui/material";
import { getDisLikes, getLikes, getReplys, handleRouting } from "@/utils";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";
import ReplyModal from "./ReplyModal";
import { useRouter } from "next/navigation";
import { Avatar } from "../ui/avatar";

import { PropTypes } from "prop-types";
import moment from "moment";
import LikeDisLikeComponent from "./LikeDisLikeComponent";
const Comments = ({ comment, user, replies }) => {
  const { userId } = useAuth();
  const [open, setOpen] = React.useState(false);
  let newRep = replies?.replies;
  let myuser = user?.user;
  const [like, setLike] = useState();
  const [likelength, setLikelength] = useState();
  const myreplies = newRep?.filter((rep) => {
    return rep?.commentId?._id === comment?._id;
  });

  function formatReplies(count) {
    if (count < 1000) return count;
    if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K"; // Formats as "1K", "2.5K", etc.
    }
    return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // For million comments
  }

  const [replyarray, setReplyArray] = useState(myreplies);
  useEffect(() => {
    const myReplies = replies?.replies.filter(
      (rep) => rep?.commentId?._id === comment?._id
    );
    setReplyArray(myReplies);
  }, [replies, comment]);

  const [replyLength, setReplyLength] = useState(myreplies?.length);

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
      // setTimeout(() => {
      //   router.push(`/gigme/social/replies/${comment?._id}`);
      // }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  //
  console.log(myreplies);
  function count() {
    if (formatReplies(replyarray.length || replyLength) === 0) {
      return "no replies";
    }
    if (formatReplies(replyarray.length || replyLength) === 1) {
      return formatReplies(replyarray.length || replyLength) + " reply";
    }
    return formatReplies(replyarray.length || replyLength) + " replies";
  }
  return (
    <>
      <ReplyModal
        open={open}
        handleClose={handleClose}
        onSubmit={onSubmit}
        text={text}
        setText={setText}
      />

      <Box
        key={comment?._id}
        className="flex items-start space-x-4 p-5 border-b-gray-300"
      >
        {/* User Image */}

        {comment?.postedBy?.picture ? (
          <Image
            width={18}
            height={18}
            src={comment?.postedBy?.picture}
            alt={comment?.postedBy?.username}
            className="w-[18px] h-[18px] rounded-full object-cover"
          />
        ) : (
          <Avatar />
        )}
        <section className="flex-1 ">
          {/* Username and CreatedAt */}
          <div className="flex items-center space-x-4">
            <p className="font-semibold text-neutral-200 title">
              {comment?.postedBy?.username}
            </p>
            <span className="text-sm text-gray-300 gigtitle">
              {moment(comment?.createdAt).calendar()}
            </span>
          </div>

          {/* Comment Text */}
          <p className="text-gray-400 mt-1 choice">{comment?.text}</p>

          {/* Like and Reply Buttons */}

          <div className="flex items-center gap-2 mt-2">
            <LikeDisLikeComponent
              apiroute={comment}
              myuser={myuser}
              mydep="comments"
              api="Comment"
              setOpen={setOpen}
            />
          </div>
          <h6
            className="text-blue-400 choice mt-2"
            onClick={() => router.push(`/gigme/social/replies/${comment?._id}`)}
          >
            {count()}
          </h6>
        </section>
      </Box>
    </>
  );
};
// proptypes for comments

Comments.propTypes = {
  comment: PropTypes.object,
  user: PropTypes.object,
  replies: PropTypes.object,
};
export default Comments;
