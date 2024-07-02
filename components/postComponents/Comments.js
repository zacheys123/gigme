import Image from "next/image";
import React, { useState } from "react";
import HeaderDetails from "./HeaderDetails";
import { Box, Divider } from "@mui/material";
import {
  differenceInMinutes,
  getDisLikes,
  getLikes,
  handleRouting,
} from "@/utils";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";
const Comments = ({ comment }) => {
  const [like, setLike] = useState();
  const [comm, setComm] = useState("");
  const [commentLoad, setComentLoad] = useState();
  const [dislike, setdisLike] = useState();
  const [likelength, setLikelength] = useState();
  const [commentLength, setCommentlength] = useState();
  const [dislikelength, setdisLikelength] = useState();
  const [replyarray, setReplyArray] = useState([]);
  let username = "text-[11px]   ml-2 text-blue-300 font-normal";
  let globe = "text-[8px] ";
  let posted = "text-neutral-400 font-mono text-[11px] md:text-[13px] ml-2";
  const { userId } = useAuth();
  return (
    <div className="mt-1  shadow-full p-4 rounded-md h-[85px] my-5  mx-2 flex flex-col">
      {/* <HeaderDetails
        comment={comment}
        today={new Date()}
        username={username}
        globe={globe}
        posted={posted}
      /> */}
      <div className="flex items-center mt-2">
        {comment?.postedBy?.picture && (
          <Image
            alt={comment && comment?.postedBy?.firstname.split("")[0]}
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
        <h6 className="text-[13px] text-neutral-300 m-2">{comment?.text}</h6>

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
              <FaRegCommentAlt />
            </div>
          </div>
        </Box>
        {/* reply section */}
        <div className="my-2">
          <h4 className="text-[11px] text-blue-400 ">
            {replyarray?.length < 1 && "no reply"}
          </h4>{" "}
        </div>
      </div>
      <Divider className="bg-neutral-400" />
    </div>
  );
};

export default Comments;
