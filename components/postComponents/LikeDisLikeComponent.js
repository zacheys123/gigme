"use client";
import {
  handleLike,
  handleUndislike,
  handleUnlike,
  handledisLike,
} from "@/features/likeDislike";
import { getComments, getDisLikes, getLikes } from "@/utils";
import React, {
  useState,
  useOptimistic,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { BsReplyFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { ChatBubbleOutline } from "@mui/icons-material";
import useStore from "@/app/zustand/useStore";
import { Box } from "@mui/material";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";
const LikeDisLikeComponent = ({
  apiroute,
  myuser,
  mydep,
  api,
  comments,
  setOpen,
}) => {
  const [like, setLike] = useState(false);
  const { userId } = useAuth();
  const [likelength, setLikelength] = useState(
    apiroute?.likes.length === 0 ? "" : apiroute.likes.length
  );
  const { setShowComments, setCurrentpost } = useStore();
  const [commentsArray, setComments] = useState(comments || []);

  // user data
  // const { user } = useCurrentUser(userId);
  // // loading state triggered when creating a new comment
  // const [commentLoad, setComentLoad] = useState();
  // const [commlength, setCommLength] = useState(commentsArray.length);
  // console.log(comments);
  let deplike = `/api/${mydep}/like${api}/${apiroute?._id}`;
  let depunlike = `/api/${mydep}/unlike${api}/${apiroute?._id}`;

  const setPostLike = () => {
    handleLike(deplike, myuser?._id, setLikelength, setLike);
  };
  const setPostUnLike = () => {
    handleUnlike(depunlike, myuser?._id, setLikelength, setLike);
  };
  // const setPostdisLike = () => {
  //   handledisLike(depdislike, myuser?._id, setdisLikelength, setdisLike);
  // };
  // const setPostUndisLike = () => {
  //   handleUndislike(depundislike, myuser?._id, setdisLikelength, setdisLike);
  // };

  const [commentInputs, setCommentInputs] = useState({});

  // Handle change in the input field for a specific post
  // const handleCommentChange = (e, postId) => {
  //   const { value } = e.target;
  //   // Update the comment input value for the specific post
  //   setCommentInputs({
  //     ...commentInputs,
  //     [postId]: value,
  //   });
  // };

  // get a random comment after every 30secs
  const randComment = useCallback(() => {
    let arr = commentsArray;
    return arr[Math.floor(Math.random() * arr?.length)];
  }, [commentsArray]);
  useEffect(() => {
    setTimeout(() => {
      randComment();
    }, 500);
  });
  console.log(comments);
  return (
    <section className="flex flex-col gap-2 w-full">
      <Box className="flex  gap-4 mb-1 ml-6">
        <div className="flex  items-center  ">
          {" "}
          <h6
            className={
              mydep !== "reply"
                ? "text-[11px] mr-1 font-mono text-white"
                : "text-[11px] mr-1 font-mono text-gray-700"
            }
          >
            {" "}
            {getLikes(apiroute, likelength)}
          </h6>
          {(!like && !apiroute?.likes.includes(myuser?._id)) ||
          likelength < 1 ? (
            <FaRegHeart
              onClick={setPostLike}
              className={
                mydep !== "comments" && mydep !== "posts"
                  ? "text-gray-800"
                  : "text-gray-300"
              }
            />
          ) : (
            <FaHeart onClick={setPostUnLike} className="text-red-500" />
          )}
        </div>
        {mydep !== "reply" && mydep !== "comments" ? (
          <div className="flex  items-center  gap-1">
            <h6 className="text-neutral-300 title my-1">{comments?.length}</h6>
            <ChatBubbleOutline
              size="18px"
              sx={{ fontSize: "18px" }}
              onClick={() => {
                alert(apiroute?._id);
                setCurrentpost(apiroute);

                setShowComments(true);
              }}
            />
          </div>
        ) : (
          <div className="flex  items-center  gap-1">
            <h6 className="text-white gigtitle">
              <BsReplyFill size="16px" onClick={() => setOpen(true)} />
            </h6>
          </div>
        )}
      </Box>
    </section>
  );
};

export default LikeDisLikeComponent;
