"use client";
import { useGetUsers } from "@/hooks/useGetUsers";
import { differenceInMinutes, formattedtime } from "@/utils";
import { Box, CircularProgress } from "@mui/material";
import { Avatar } from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Message = ({ myMessages, other, curr }) => {
  const [reciever, setReciever] = useState({});
  const [sender, setSender] = useState({});
  let fromme = myMessages?.sender === curr;
  let fromother = myMessages?.reciever === other;
  const chatclassName = fromme ? "chat chat-end" : "chat chat-start";
  const profpic = fromme ? sender?.user?.picture : reciever?.user?.picture;
  const name = fromme ? sender?.user?.username : reciever?.user?.username;
  const background = fromme ? "bg-blue-500 " : "";
  const color = !fromme
    ? "text-red-200 font-bold"
    : "text-purple-100 font-bold";
  const { loading } = useGetUsers(setReciever, setSender, other, curr);
  console.log(myMessages);
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
                {sender?.user?.picture || reciever?.user?.picture ? (
                  <Image
                    width={16}
                    height={16}
                    alt="A"
                    src={profpic}
                    className="h-[16px] w-[16px] object-fit"
                  />
                ) : (
                  <Avatar />
                )}
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
              sent at{" "}
              <span className="font-mono text-[12px]">
                {formattedtime(myMessages?.createdAt)}
              </span>
            </div>
          </Box>

          {/* <div className={fromme && `chat chat-end`}>
            <div className="chat-image avatar">
              <div className=" rounded-full h-[16px] w-[16px]">
                {sender?.user?.picture ? (
                  <Image
                    width={16}
                    height={16}
                    alt="A"
                    src={profpic}
                    className="h-[16px] w-[16px] object-fit"
                  />
                ) : (
                  <Avatar />
                )}
              </div>
            </div>
            <div className="chat-header">{name}</div>
            <div className="chat-bubble">{fromme && myMessages?.text}</div>
            <time className="text-xs opacity-50">
              {formattedtime(myMessages?.createdAt)}
            </time>
          </div>
          <div className={fromother && `chat chat-start`}>
            <div className="chat-image avatar">
              <div className=" rounded-full h-[16px] w-[16px]">
                {reciever?.user?.picture ? (
                  <Image
                    width={16}
                    height={16}
                    alt="A"
                    src={profpic}
                    className="h-[16px] w-[16px] object-fit"
                  />
                ) : (
                  <Avatar />
                )}
              </div>
            </div>
            <div className="chat-header">{name}</div>
            <div className="chat-bubble">{fromother && myMessages?.text}</div>
            <time className="text-xs opacity-50">
              {" "}
              {formattedtime(myMessages?.createdAt)}
            </time>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Message;

{
  /*{messages
        .map((message) => (
          <div key={message.uniqid} className="w-full h-[35px]  my-5">
            {/* {message.postedBy.clerkId.includes(userId)} */
}
// {message.bookedid === "1" && (
//   <div className="flex items-end">
//     <div className="flex flex-col items-start  my-2">
//       <h6 className=" outgoing-msg     flex flex-col    p-3 rounded-xl text-[11px] md:text-[13px]">
//         <span>{message.text}</span>
//         <span className="text-neutral-200 text-[10px] link ">
//           {message.time}
//         </span>{" "}
//       </h6>
//     </div>
//   </div>
// )}
//     {message.bookedid === "2" && (
//       <div className="flex items-end justify-end">
//         <div className="flex flex-col items-end  my-2">
//           <h6 className=" flex flex-col recieved-msg   p-3 rounded-xl text-[11px] md:text-[13px]">
//             <span>{message.text}</span>
//             <span className="text-neutral-500 text-[10px] link ">
//               {message.time}
//             </span>{" "}
//           </h6>
//         </div>
//       </div>
//     )}
//   </div>
// ))
// .reverse() */}

{
  /* 
          <div className="w-full h-[35px]  my-5">
            {" "}
            {myMessages.reciever === curr && (
              <div className="flex items-start">
                {" "}
                <div className="flex flex-col items-start  my-2">
                  {" "}
                  <h6 className=" outgoing-msg     flex flex-col    p-3 rounded-xl text-[11px] md:text-[13px]">
                    <span>{myMessages.text}</span>{" "}
                    <span className="text-neutral-200 text-[10px] link ">
                      {myMessages.createdAt}{" "}
                    </span>{" "}
                  </h6>{" "}
                </div>{" "}
              </div>
            )}
            {myMessages.sender === other && (
              <div className="flex items-end justify-end">
                <div className="flex flex-col items-end  my-2">
                  <h6 className=" flex flex-col recieved-msg   p-3 rounded-xl text-[11px] md:text-[13px]">
                    <span>{myMessages.text}</span>
                    <span className="text-neutral-200 text-[10px] link ">
                      {differenceInMinutes(myMessages.createdAt, new Date())}
                    </span>{" "}
                  </h6>
                </div>
              </div>
            )}
            {/* // {myMessages (
      //   <h6>send a message to start a conversation</h6>
      // )} */
}
// </div> */}
