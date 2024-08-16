import { Box } from "@mui/material";
import Image from "next/image";
import { PropTypes } from "prop-types";
import React, { useEffect } from "react";

const ChatHeader = ({ myUser, onlineUsers, id }) => {
  const isOnline = onlineUsers.includes(id?._id);
  return (
    <div className="w-full border-0 border-b-slate-900 shadow-sm h-[40] p-1 mb-2 bg-gray-300 rounded-sm ">
      <div className="flex gap-1 items-center">
        {myUser?.user?.picture && (
          <div className="h-full">
            <Image
              src={myUser?.user?.picture}
              width={20}
              height={20}
              alt="profile"
              className="rounded-full w-[20px] h-[20px]"
            />
          </div>
        )}
        <Box className="flex flex-col ">
          <h6 className="title  text-red-400">{myUser?.user?.firstname}</h6>
          {isOnline ? (
            <span className="link text-white">Online</span>
          ) : (
            <span className="link text-white">Active 3hrs ago...</span>
          )}
        </Box>
      </div>
    </div>
  );
};

export default ChatHeader;
ChatHeader.propTypes = {
  myUser: PropTypes.object,
};
