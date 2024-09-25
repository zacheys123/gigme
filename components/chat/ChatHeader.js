"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";
import useStore from "@/app/zustand/useStore";
import clsx from "clsx";

const ChatHeader = ({ myUser, id, otherUser }) => {
  const { onlineUsers } = useStore();
  let isonline = onlineUsers?.some(
    (user) => user?.userId === myUser?.user?._id
  );
  console.log(onlineUsers);
  return (
    <div className="w-full border-0 border-b-slate-900 shadow-sm h-[40] p-1 mb-2 bg-gray-300 rounded-sm ">
      <div className="flex gap-1 items-center">
        {myUser?.user?.picture && (
          <div className=" h-[30px]  relative">
            <Image
              src={myUser?.user?.picture}
              width={30}
              height={30}
              alt="profile"
              className="rounded-full w-[30px] h-[30px]"
            />{" "}
            <div
              className={
                isonline
                  ? `bottom-0 right-0 absolute  w-3 h-3 bg-green-400 border-2 border-white  rounded-full animate-pulse`
                  : ``
              }
            />
          </div>
        )}
        <Box className="flex flex-col ">
          <div className=" ">
            <h6 className="title  text-red-400 ">{myUser?.user?.firstname}</h6>
          </div>
          {isonline ? (
            <span className="link text-green-600 no-underline">online</span>
          ) : (
            <span className="link text-red-600 no-underline">
              last seen
              {moment(Date.now()).calendar()}
            </span>
          )}
        </Box>
      </div>
    </div>
  );
};

export default ChatHeader;
ChatHeader.propTypes = {
  myUser: PropTypes.object,
  id: PropTypes.string,
  otherUser: PropTypes.object,
};
