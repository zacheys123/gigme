"use client";
import React from "react";
import { PropTypes } from "prop-types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import ChatHeader from "./ChatHeader";
import ChatPage from "./ChatPage";
import ChatInput from "./ChatInput";

const Chat = ({ myGig }) => {
  const router = useRouter();
  console.log(myGig);

  return (
    <Dialog
      open
      className="h-[700px]  max-w-[100%] mx-auto p-1 bg-gray-500"
      onOpenChange={(isOpen) => {
        if (!isOpen) router.back();
      }}
    >
      <DialogContent className="sm:max-w-[55%] w-[70%] md:w-[80%] xl:w-[85%]  shadow-sm shadow-gray-300">
        <DialogHeader className=" h-[30px]">
          <DialogTitle className="text-[13px]">
            <span className="text-purple-400 font-bold title">Chat</span>
            <span className="text-red-500 font-bold">Me!!!</span>
          </DialogTitle>
        </DialogHeader>
        <div className=" w-full flex flex-col gap-1 h-[470px]">
          {/* header */} <ChatHeader myGig={myGig} />
          {/*  messages*/}
          <ChatPage myGig={myGig} />
          {/* input */}
          <ChatInput myGig={myGig} />
        </div>
        <small className="text-center text-muted-foreground">
          Powered By:gigMeUp
        </small>
      </DialogContent>
    </Dialog>
  );
};
export default Chat;

Chat.propTypes = {
  myGig: PropTypes.object,
};
