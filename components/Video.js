import React from "react";
import ReactPlayer from "react-player";

import moment from "moment";

const Video = ({ post }) => {
  return (
    <div
      className="player-container  w-[100%] -mt-[30px] 
     "
    >
      <div className="header">
        <div className="user-info">
          <img
            src={post?.postedBy[0]?.picture}
            alt={post?.postedBy[0]?.username}
            className="profile-image"
          />
          <span className="username">{post?.postedBy[0]?.username}</span>
        </div>
        <span className="timestamp">{moment(post?.createdAt).calendar}</span>
      </div>
      <ReactPlayer
        url={post?.media}
        className="react-player"
        controls={true} // Show controls
        width="100%"
        height="100%"
        light={true} // Show a thumbnail before playing
      />{" "}
      <div className="title text-neutral-300 text-[13px] my-1">
        {post?.title}
      </div>
      <div className="caption">{post?.description}</div>
    </div>
  );
};

export default Video;
