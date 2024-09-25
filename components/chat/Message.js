"use client";
import { useGetUsers } from "@/hooks/useGetUsers";
import { differenceInMinutes, formattedtime } from "@/utils";
import { Box, CircularProgress } from "@mui/material";
import { Avatar } from "flowbite-react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AvatarComponent from "../Avatar";

const Message = ({ myMessages, other, curr }) => {
  const [reciever, setReciever] = useState({});
  const [sender, setSender] = useState({});
  let fromme = myMessages?.sender === curr;
  let fromother = myMessages?.reciever === other;
  const chatclassName = fromme ? "chat chat-end" : "chat chat-start";
  const profpic = fromme ? sender : reciever;
  const name = fromme ? sender?.user?.username : reciever?.user?.username;
  const background = fromme ? "bg-blue-500 " : "";
  const color = !fromme
    ? "text-red-200 font-bold"
    : "text-purple-100 font-bold";
  const { loading } = useGetUsers(setReciever, setSender, other, curr);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[200px] w-[200px]">
          <CircularProgress size={10} />
        </div>
      ) : (
        <>
          <Box className={chatclassName}>
            <div className="chat-image avatar">
              <div className=" rounded-full h-[16px] w-[16px]">
                <AvatarComponent
                  user={profpic}
                  className="h-[16px] w-[16px] object-fit"
                />
              </div>
            </div>

            <div className={`chat-bubble text-white  ${background} h-fit`}>
              {" "}
              <div
                className={`chat-header font-sans text-[11px] underline ${color}`}
              >
                {name}
              </div>
              <span className="title">{myMessages?.text}</span>
            </div>
            <div className="chat-footer opacity-50">
              sent{" "}
              <span className="font-mono text-[12px]">
                {/* {formattedtime(myMessages?.createdAt)} */}
                {moment(myMessages?.createdAt).calendar()}
              </span>
            </div>
          </Box>
        </>
      )}
    </div>
  );
};

export default Message;
