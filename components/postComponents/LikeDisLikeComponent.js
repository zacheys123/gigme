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
import { useSocket } from "@/hooks/useSocket";
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
  const [likelength, setLikelength] = useState(apiroute?.likes?.length);

  useEffect(() => {
    // Filter out replies to the current comment

    setLikelength(apiroute?.likes?.length);
  }, [apiroute]);
  const { socket } = useSocket();
  const { setShowComments, setCurrentpost } = useStore();

  // user data
  // const { user } = useCurrentUser(userId);
  // // loading state triggered when creating a new comment
  // const [commentLoad, setComentLoad] = useState();
  // const [commlength, setCommLength] = useState(commentsArray.length);
  // console.log(comments);
  let deplike = `/api/${mydep}/like${api}/${apiroute?._id}`;
  let depunlike = `/api/${mydep}/unlike${api}/${apiroute?._id}`;
  const setPostLike = () => {
    handleLike(deplike, myuser?._id, setLikelength, setLike, socket);
  };
  const setPostUnLike = () => {
    handleUnlike(depunlike, myuser?._id, setLikelength, setLike, socket);
  };
  useEffect(() => {
    // Listen for 'update_like' event from the server
    socket.on("update_like", (updatedLikeData) => {
      console.log(updatedLikeData);
      if (updatedLikeData.postId === apiroute?._id) {
        // Update the like length when receiving the real-time update
        setLikelength(updatedLikeData.likesCount);
      }
    });

    return () => {
      socket.off("update_like"); // Cleanup the listener when the component unmounts
    };
  }, [apiroute?._id, socket]);

  // const setPostdisLike = () => {
  //   handledisLike(depdislike, myuser?._id, setdisLikelength, setdisLike);
  // };
  // const setPostUndisLike = () => {
  //   handleUndislike(depundislike, myuser?._id, setdisLikelength, setdisLike);
  // };

  // Handle change in the input field for a specific post
  // const handleCommentChange = (e, postId) => {
  //   const { value } = e.target;
  //   // Update the comment input value for the specific post
  //   setCommentInputs({
  //     ...commentInputs,
  //     [postId]: value,
  //   });
  // };

  return (
    <section className="flex flex-col gap-2 w-full rounded-md">
      <Box className="flex  gap-4 mb-1 ml-6">
        {comments !== "replycomment" && (
          <div className="flex  items-center  ">
            {" "}
            <h6
              className={
                mydep !== "reply"
                  ? "text-[11px] mr-1 font-mono text-white"
                  : "text-[11px] mr-1 font-mono text-gray-300"
              }
            >
              {" "}
              {getLikes(apiroute, likelength)}
            </h6>
            {like === false && !apiroute?.likes?.includes(myuser?._id) ? (
              <FaRegHeart
                onClick={setPostLike}
                className={
                  mydep !== "comments" && mydep !== "posts"
                    ? "text-gray-400"
                    : "text-gray-300"
                }
              />
            ) : (
              <FaHeart onClick={setPostUnLike} className="text-red-500" />
            )}
          </div>
        )}
        {mydep !== "reply" && mydep !== "comments" ? (
          <div className="flex  items-center  gap-1">
            <h6 className="text-neutral-300 title my-1">{comments?.length}</h6>
            <ChatBubbleOutline
              size="18px"
              sx={{ fontSize: "18px" }}
              onClick={() => {
                setCurrentpost(apiroute);

                setShowComments(true);
              }}
            />
          </div>
        ) : (
          <div className="flex  items-center  gap-1">
            <h6 className="text-gray-400 gigtitle">
              <BsReplyFill size="16px" onClick={() => setOpen(true)} />
            </h6>
          </div>
        )}
      </Box>
    </section>
  );
};

export default LikeDisLikeComponent;
