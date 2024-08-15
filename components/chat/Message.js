"use client";
import { useGetUsers } from "@/hooks/useGetUsers";
import { differenceInMinutes, formattedtime } from "@/utils";
import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Message = ({ myMessages, other, curr }) => {
  const [reciever, setReciever] = useState({});
  const [sender, setSender] = useState({});
  let fromme = myMessages?.sender === curr;
  const chatclassName = fromme ? "chat chat-end" : "chat chat-start";
  const profpic = fromme ? sender?.user?.picture : reciever?.user?.picture;
  const name = fromme ? sender?.user?.username : reciever?.user?.username;
  const background = fromme ? "bg-blue-500" : "";
  const { loading } = useGetUsers(setReciever, setSender, other, curr);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[200px] w-[200px]">
          <CircularProgress size={10} />
        </div>
      ) : (
        <Box className={chatclassName}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                width={25}
                height={25}
                alt="Tailwind CSS chat bubble component"
                src={profpic}
              />
            </div>
          </div>
          <div className="chat-header">{name}</div>
          <div className={`chat-bubble text-white pb-2 ${background}`}>
            {myMessages?.text}
          </div>
          <div className="chat-footer opacity-50">
            {formattedtime(myMessages?.createdAt)}
          </div>
        </Box>
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
  /*    // <div key={myMessages?._id} className="w-full h-[35px]  my-5">
    //   {myMessages?.chat?.length > 0 &&
    //     myMessages?.messages
    //       .filter((message) => message.reciever === other)

    //       .map((message, index) => (
    //         <div key={message._id} className="w-full h-[35px]  my-5">
    //           {" "}
    //           <div className="flex items-start">
    //             {" "}
    //             <div className="flex flex-col items-start  my-2">
    //               {" "}
    //               <h6 className=" outgoing-msg     flex flex-col    p-3 rounded-xl text-[11px] md:text-[13px]">
    //                 <span>{message.text}</span>{" "}
    //                 <span className="text-neutral-200 text-[10px] link ">
    //                   {message.time}{" "}
    //                 </span>{" "}
    //               </h6>{" "}
    //             </div>{" "}
    //           </div>
    //         </div>
    //       ))}
    //   {myMessages?.chat?.length > 0 &&
    //     myMessages?.messages
    //       .filter((message) => message.sender === curr)
    //       .map((message, index) => (
    //         <div key={message._id} className="w-full h-[35px]  my-5">
    //           <div className="flex items-end justify-end">
    //             <div className="flex flex-col items-end  my-2">
    //               <h6 className=" flex flex-col recieved-msg   p-3 rounded-xl text-[11px] md:text-[13px]">
    //                 <span>{message.text}</span>
    //                 <span className="text-neutral-200 text-[10px] link ">
    //                   {differenceInMinutes(message, new Date())}
    //                 </span>{" "}
    //               </h6>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //   {!myMessages?.chat?.length < 0 && (
    //     <h6>send a message to start a conversation</h6>
    //   )}
    // </div> */
}
