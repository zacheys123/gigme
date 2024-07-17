"use client";
import { global } from "@/actions";
import { useGlobalContext } from "@/app/Context/store";
import {
  differenceInMinutes,
  getComments,
  getDisLikes,
  getLikes,
} from "@/utils";
import { Box, CircularProgress } from "@mui/material";
import { TextInput } from "flowbite-react";
import { Globe } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import Comments from "./Comments";
import HeaderDetails from "./HeaderDetails";
import {
  handleLike,
  handleUndislike,
  handleUnlike,
  handledisLike,
} from "@/features/likeDislike";
import LikeDisLikeComponent from "./LikeDisLikeComponent";
const SinglePost = ({ post, user, comments, replies }) => {
  let newComm = comments?.comments;
  let myuser = user?.user;

  const {
    userState: {},
    setUserState,
  } = useGlobalContext();
  const [like, setLike] = useState();
  const [comm, setComm] = useState("");
  const [commentLoad, setComentLoad] = useState();
  const [dislike, setdisLike] = useState();
  const [likelength, setLikelength] = useState(post?.likes.length);
  const [dislikelength, setdisLikelength] = useState(post.dislikes.length);

  let myComments = newComm.filter((com) => {
    return com?.postId?._id === post?._id;
  });
  console.log(post);
  const [commentLength, setCommentlength] = useState(myComments?.length);
  const [commentsArray, setComments] = useState(myComments);
  const [showComments, setShowComments] = useState();
  var today = new Date();
  function calcComments() {
    setCommentlength((prev) => prev + 1);
  }
  const handleComment = async (ev) => {
    ev.preventDefault();
    setComentLoad(true);
    try {
      const dataInfo = {
        text: comm,
        postedBy: user?.user?._id,
        post: post?._id,
      };
      console.log(dataInfo);
      const res = await fetch(`/api/comments/createComment/${post?._id}`, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(dataInfo),
      });

      const data = await res.json();
      console.log(data);
      calcComments();
      setComments((commentsArray) => [...commentsArray, data?.results[0]]);
      setComm("");
      setComentLoad(false);
    } catch (error) {
      setComentLoad(false);
    }
  };
  // get a random comment after every 30secs
  const randComment = useCallback(() => {
    let arr = commentsArray;
    return arr[Math.floor(Math.random() * arr.length)];
  }, [commentsArray]);
  useEffect(() => {
    setTimeout(() => {
      randComment();
    }, 3000);
  });

  let username = "text-[13px]   ml-2 text-blue-300 font-bold";
  let globe = "text-[10px]";
  let posted = "text-neutral-400 font-mono text-[13px] md:text-[15px]";

  function alt() {
    return (
      <div className="text-neutral-500 font-mono  bg-gray-200 flex justify-center items-center w-[20px] h-[20px]">
        {randComment() && randComment()?.postedBy?.firstname?.split("")[0]}
      </div>
    );
  }
  return (
    <div
      className="container p-3 shadow-slate-400 w-[90%] my-2 
     bg-neutral-600 rounded-md mx-auto h-[560px] flex flex-col gap-2 overflow-hidden element-with-scroll"
    >
      <HeaderDetails
        posts={post}
        today={today}
        username={username}
        globe={globe}
        posted={posted}
        user={user}
      />
      {/* displaying title and the rest of the post */}
      <Box className="flex flex-col bg-gray-200 rounded-md p-2">
        <div className="title text-neutral-500 text-[13px] ">{post?.title}</div>
        <div>
          {post?.media && (
            <Image
              width={130}
              height={130}
              src={post?.media}
              alt="post image"
              className="object-cover h-[260px] w-full mt-3"
            />
          )}
          <h6 className="text-blue-600 font-bold text-[13px] mt-2 font-mono">
            #{post?.description}
          </h6>
        </div>
      </Box>
      {/* likes and dislikes */}
      <LikeDisLikeComponent
        apiroute={post}
        myuser={myuser}
        mydep="posts"
        api="Post"
      />
      {/* comment section */}
      {!showComments ? (
        <div
          className="flex flex-col h-[170px] bg-slate-800 rounded-xl mb-5 px-2  hover:bg-slate-600 cursor-pointer transition-all duration-500"
          onClick={() =>
            // setUserState({ type: global.SHOWCOMMENTS, payload: !showComments })
            setShowComments((prev) => !prev)
          }
        >
          <h6 className="text-neutral-300 text-[13px] my-1">
            {getComments(commentsArray, commentLength)}
          </h6>
          <div className="flex mt-1 items-center mb-3">
            {randComment()?.postedBy?.picture && (
              <Image
                alt={alt()}
                src={randComment() && randComment()?.postedBy?.picture}
                width={20}
                height={20}
                className="w-[20px] h-[20px]  rounded-full"
              />
            )}{" "}
            <h6 className="text-[13px]  text-neutral-300 ml-2">
              {randComment()?.text}
            </h6>
          </div>
        </div>
      ) : (
        <>
          <section className="w-full h-full overflow-auto -mt-1 bg-neutral-slate-600">
            <div className="flex justify-between items-center">
              <FaArrowLeft
                onClick={() =>
                  // setUserState({
                  //   type: global.SHOWCOMMENTS,
                  //   payload: !showComments,
                  // })
                  setShowComments((prev) => !prev)
                }
              />
              <h6 className="text-neutral-300 text-[13px]">
                {getComments(commentsArray, commentLength)}
              </h6>{" "}
              {!commentLoad ? "" : <CircularProgress size="16px" />}
            </div>
            <div>
              {commentsArray &&
                commentsArray
                  ?.map((comment) => {
                    return (
                      <Comments
                        key={comment?._id}
                        comment={comment}
                        user={user}
                        replies={replies}
                      />
                    );
                  })
                  .reverse()}
            </div>
            <form className="w-full relative h-full" onSubmit={handleComment}>
              <input
                id="post"
                type="text"
                placeholder="Add a comment...."
                required
                value={comm}
                onChange={(ev) => setComm(ev.target.value)}
                className="w-[98%] text-[12px]  h-[30px] bottom-0 absolute rounded-xl   outline-none mx-auto focus-within:ring-0 bg-inherit font-mono placeholder-sky-500"
              />
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default SinglePost;
