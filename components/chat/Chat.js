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
import ClientOnly from "@/app/ClientOnly";
import { useCurrentUser } from "@/hooks/useCurrentUser";
const Chat = ({ other, curr, getGig }) => {
  const { userId } = useAuth();
  const { onlineUsers } = useSocketContext();
  const {
    userState: { messages },
    setUserState,
  } = useGlobalContext();
  const sender = useRef();
  const reciever = useRef();
  const postedorbookedById = other?.user?._id;
  const currentId = curr?.user?._id;
  const gigId = getGig?.gigs?._id;

  const router = useRouter();

  // console.log(
  //   "currentId" + currentId,
  //   "postedorbookedById" + postedorbookedById
  // );
  useEffect(() => {
    sender.current = currentId;
    reciever.current = postedorbookedById;
  }, [currentId, postedorbookedById]);
  const { loading, user } = useCurrentUser(userId);
  const [postedOther, setOther] = useState({});
  useEffect(() => {
    const getReciever = async () => {
      try {
        const res = await fetch(`/api/chat/getuserchat/${postedorbookedById}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const gigs = await res.json();
        setOther(gigs);
      } catch (error) {
        console.log(error);
      }
    };
    getReciever();
  }, [other, setOther, postedorbookedById]);
  return (
    <ClientOnly>
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
            <ChatHeader
              myUser={other}
              onlineUsers={onlineUsers}
              id={user?.user?._id}
              otherUser={postedOther}
            />
            {/*  messages*/}
            <ClientOnly>
              <ChatPage
                currentId={currentId}
                postedorbookedById={postedorbookedById}
                gigId={gigId}
              />
            </ClientOnly>
            {/* input */}
            <ChatInput
              currentId={currentId}
              postedorbookedById={postedorbookedById}
              gigId={gigId}
            />
          </div>
          <small className="text-center text-muted-foreground">
            Powered By:gigMeUp
          </small>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
};
export default Chat;
Chat.propTypes = {
  other: PropTypes.object,
  curr: PropTypes.object,
};
