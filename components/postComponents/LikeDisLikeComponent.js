"use client";
import {
  handleLike,
  handleUndislike,
  handleUnlike,
  handledisLike,
} from "@/features/likeDislike";
import { getDisLikes, getLikes } from "@/utils";
import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
const LikeDisLikeComponent = ({ apiroute, myuser, mydep }) => {
  const [like, setLike] = useState();
  const [dislike, setdisLike] = useState();
  const [likelength, setLikelength] = useState(apiroute?.likes.length);
  const [dislikelength, setdisLikelength] = useState(
    apiroute?.dislikes?.length
  );

  let deplike = `/api/
  ${mydep}/likeComment/${apiroute?._id}`;
  let depunlike = `/api/
  ${mydep}/UnlikeComment/${apiroute?._id}`;
  let depdislike = `/api/
  ${mydep}/dislikeComment/${apiroute?._id}`;
  let depundislike = `/api/
  ${mydep}/undislikeComment/${apiroute?._id}`;
  const setPostLike = () => {
    handleLike(deplike, myuser?._id, setLikelength, setLike);
  };
  const setPostUnLike = () => {
    handleUnlike(depunlike, myuser?._id, setLikelength, setLike);
  };
  const setPostdisLike = () => {
    handledisLike(depdislike, myuser?._id, setdisLikelength, setdisLike);
  };
  const setPostUndisLike = () => {
    handleUndislike(depundislike, myuser?._id, setdisLikelength, setdisLike);
  };
  return (
    <div className="flex gap-4 items-center  mb-3 ml-10">
      <div className="flex  items-center likes">
        {" "}
        <h6 className="text-[11px] mr-1 font-mono">
          {" "}
          {getLikes(apiroute, likelength)}
        </h6>
        {(!like && !apiroute?.likes.includes(myuser?._id)) || likelength < 1 ? (
          <AiOutlineLike onClick={setPostLike} />
        ) : (
          <AiFillLike onClick={setPostUnLike} />
        )}
      </div>
      <div className="flex  items-center likes">
        <h6 className="text-[11px] mr-1 font-mono">
          {" "}
          {getDisLikes(apiroute, dislikelength)}
        </h6>

        {(!dislike && !apiroute?.dislikes.includes(myuser?._id)) ||
        dislikelength < 1 ? (
          <AiOutlineDislike onClick={setPostdisLike} />
        ) : (
          <AiFillDislike onClick={setPostUndisLike} />
        )}
      </div>
    </div>
  );
};

export default LikeDisLikeComponent;
