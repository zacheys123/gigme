"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import OnlineTracker from "../Online";
import { pusherClient } from "@/lib/pusher-client";
import pusherJs from "pusher-js";
import { diff, differenceInMinutes, formattedtime } from "@/utils";
import OnlineUsers from "../Online";
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
          <div className=" h-[30px]">
            {/* <Image
              src={myUser?.user?.picture}
              width={30}
              height={30}
              alt="profile"
              className="rounded-full w-[30px] h-[30px]"
            />{" "} */}
            <div
              classsName={
                isonline
                  ? ` m-4  h-[17px] w-[17px] border bg-green-500 rounded-full z-50 `
                  : ` m-4  h-[17px] w-[17px] border bg-green-500 rounded-full z-50`
              }
            ></div>
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
              {moment(myUser?.user?.lastActivity).calendar()}
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
