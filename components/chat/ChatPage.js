"use client";
import { useFetchMessages } from "@/hooks/useFetchMessages";
import { PropTypes } from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Message from "./Message";
import Skeleton from "./Skeleton";
import { useParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

const ChatPage = ({
  currentId,
  postedorbookedById,
  gigId,
  setMess,
  messages,
}) => {
  const { gigid } = useParams();
  const { socket } = useSocket();
  const lastmsg = useRef();
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Track if the other user is typing
  const [typingTimeout, setTypingTimeout] = useState(null); // Timeout for stopTyping event

  const url = `/api/chat/fetchchats/${currentId}/${postedorbookedById}`;

  // Memoize setMess to avoid dependency array changes in useEffect
  const handleSetMessages = useCallback(
    (newMessages) => setMess((prev) => [...prev, ...newMessages]),
    [setMess]
  );

  useEffect(() => {
    if (!currentId || !postedorbookedById) return;

    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setMess(data?.chat?.messages || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [currentId, postedorbookedById, url, setMess]);

  useEffect(() => {
    console.log("Socket:", socket); // Check if socket is available

    if (!socket) return;

    const handleNewMessage = (data) => {
      console.log("New Message:", data); // Debug message data
      handleSetMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("getMessage", handleNewMessage);

    return () => socket.off("getMessage", handleNewMessage);
  }, [socket, handleSetMessages]);

  // Scroll to the latest message when messages update
  useEffect(() => {
    if (messages?.length > 0) {
      lastmsg.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Emit typing events
  const handleTyping = () => {
    if (!socket) return;
    socket.emit("typing", {
      senderId: currentId,
      receiverId: postedorbookedById,
    });

    // Clear any existing timeout to avoid multiple "stopTyping" events
    if (typingTimeout) clearTimeout(typingTimeout);

    // Set a new timeout to emit "stopTyping" after 2 seconds of no input
    const timeout = setTimeout(() => {
      socket.emit("stopTyping", {
        senderId: currentId,
        receiverId: postedorbookedById,
      });
    }, 2000);

    setTypingTimeout(timeout);
  };

  // Listen for typing events from the other user
  useEffect(() => {
    const handleUserTyping = ({ senderId }) => {
      if (senderId === postedorbookedById) setIsTyping(true);
    };

    const handleUserStoppedTyping = ({ senderId }) => {
      if (senderId === postedorbookedById) setIsTyping(false);
    };

    socket.on("userTyping", handleUserTyping);
    socket.on("userStoppedTyping", handleUserStoppedTyping);

    return () => {
      socket.off("userTyping", handleUserTyping);
      socket.off("userStoppedTyping", handleUserStoppedTyping);
    };
  }, [socket, postedorbookedById]);
  return (
    <div className="relative overflow-y-auto shadow-md shadow-zinc-100 border border-input rounded-md element-with-scroll flex-1 p-2">
      {loading ? (
        <div>
          {Array.from({ length: 10 }).map((_, idx) => (
            <Skeleton key={idx} />
          ))}
        </div>
      ) : (
        <>
          {messages?.map((message) => (
            <div key={message._id} ref={lastmsg}>
              <Message
                myMessages={message}
                curr={currentId}
                other={postedorbookedById}
              />
            </div>
          ))}
          {!isTyping && (
            <div className="abolute botttom-0">
              <div class=" cont">
                {" "}
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            </div>
          )}
          {messages?.length === 0 && !isTyping && (
            <div className="h-full w-full flex justify-center items-center">
              <h6 className="text-gray-300 text-center font-mono">
                Send a message to start a chat
              </h6>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatPage;

ChatPage.propTypes = {
  currentId: PropTypes.string.isRequired,
  postedorbookedById: PropTypes.string.isRequired,
  gigId: PropTypes.string,
  setMess: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
};
