"use client";
import { useFetchMessages } from "@/hooks/useFetchMessages";
import { PropTypes } from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Message from "./Message";
import Skeleton from "./Skeleton";
import { useGlobalContext } from "@/app/Context/store";
import { useParams } from "next/navigation";
import useStore from "@/app/zustand/useStore";

import { useSocketContext } from "@/app/Context/socket";
import { useSocket } from "@/hooks/useSocket";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const ChatPage = ({
  currentId,
  postedorbookedById,
  gigId,
  setMess,
  messages,
}) => {
  const { gigid } = useParams();

  const lastmsg = useRef();
  const { chat } = useFetchMessages(currentId, postedorbookedById);
  const [loading, setLoading] = useState();
  const url = `/api/chat/fetchchats/${currentId}/${postedorbookedById}`;

  // Fetch chat messages when component mounts or IDs change
  useEffect(() => {
    async function getMessages() {
      if (!currentId || !postedorbookedById) return;
      setLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setMess(data.chat?.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    }

    getMessages();
  }, [currentId, postedorbookedById]);

  useEffect(() => {
    if (!socket) {
      console.log("Socket is not available yet");
      return; // Exit early if socket is not available
    }

    const handleConnect = () => console.log("Socket connected");
    const handleDisconnect = () => console.log("Socket disconnected");
    const handleNewMessage = (data) => {
      setMess((prev) => [...prev, data]);
      console.log("New message received:", data);
    };

    // Add listeners only after socket is available
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("getMessage", handleNewMessage);

    // Cleanup on unmount
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("getMessage", handleNewMessage);
    };
  }, [socket, currentId, postedorbookedById]);

  // let msg = messages?.filter((message) => {
  //   return chat?.gigChat === gigid;
  // });
  console.log(socket);
  useEffect(() => {
    setTimeout(() => {
      if (lastmsg.current) {
        lastmsg.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 3000);
  }, [messages, setMess]);
  return (
    <div className="overflow-y-auto shadow-md shadow-zinc-100 border border-input rounded-md element-with-scroll flex-1 p-2">
      {loading ? (
        <div>
          {Array.from({ length: 10 }).map((_, idx) => (
            <Skeleton key={idx} />
          ))}
        </div>
      ) : messages?.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} ref={lastmsg}>
            <Message
              myMessages={message}
              curr={currentId}
              other={postedorbookedById}
            />
          </div>
        ))
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <h6 className="text-gray-300 text-center font-mono">
            Send a message to start a chat
          </h6>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
ChatPage.propTypes = {
  currentId: PropTypes.string?.isRequired,
  postedorbookedById: PropTypes.string?.isRequired,
};
