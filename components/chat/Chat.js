"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useParams, useRouter } from "next/navigation";
import ChatHeader from "./ChatHeader";
import ChatPage from "./ChatPage";
import ChatInput from "./ChatInput";
import { useAuth } from "@clerk/nextjs";
import { useGlobalContext } from "@/app/Context/store";
import { useSocketContext } from "@/app/Context/SocketContext";
const Chat = ({ other, curr }) => {
  const { onlineUsers } = useSocketContext();

  console.log(onlineUsers);
  const sender = useRef();
  const reciever = useRef();
  const postedorbookedById = other?.user?._id;
  const currentId = curr?.user?._id;
  const router = useRouter();
  const {
    userState: { messages },
    setUserState,
  } = useGlobalContext();
  console.log(
    "currentId" + currentId,
    "postedorbookedById" + postedorbookedById
  );
  useEffect(() => {
    sender.current = currentId;
    reciever.current = postedorbookedById;
  }, [currentId, postedorbookedById]);
  const [id, setId] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setId(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);
  return (
    <Dialog
      open
      className="h-[700px]  max-w-[100%] mx-auto p-1 bg-gray-500"
      onOpenChange={(isOpen) => {
        if (!isOpen) router.back();
      }}
    >
      <DialogContent className="sm:max-w-[55%] w-[80%] md:w-[85%] xl:w-[90%]  shadow-sm shadow-gray-300">
        <DialogHeader className=" h-[30px]">
          <DialogTitle className="text-[13px]">
            <span className="text-purple-400 font-bold title">Chat</span>
            <span className="text-red-500 font-bold">Me!!!</span>
          </DialogTitle>
        </DialogHeader>
        <div className=" w-full flex flex-col gap-1 h-[470px]">
          {/* header */}
          <ChatHeader myUser={other} onlineUsers={onlineUsers} id={id} />
          {/*  messages*/}
          <ChatPage
            currentId={currentId}
            postedorbookedById={postedorbookedById}
            messages={messages}
            setMessages={setUserState}
          />
          {/* input */}
          <ChatInput
            currentId={currentId}
            postedorbookedById={postedorbookedById}
            messages={messages}
            setMessages={setUserState}
          />
        </div>
        <small className="text-center text-muted-foreground">
          Powered By:gigMeUp
        </small>
      </DialogContent>
    </Dialog>
  );
};
export default Chat;
