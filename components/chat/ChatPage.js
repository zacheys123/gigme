"use client";
import { useFetchMessages } from "@/hooks/useFetchMessages";
import { PropTypes } from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Message from "./Message";
import Skeleton from "./Skeleton";
import { useGlobalContext } from "@/app/Context/store";
import { useParams } from "next/navigation";
import useStore from "@/app/zustand/useStore";
import { pusherClient } from "@/lib/pusher-client";

const ChatPage = ({ currentId, postedorbookedById, gigId }) => {
  const { gigid } = useParams();

  const { messages, setMessages } = useStore();
  const lastmsg = useRef();

  const [loading, setLoading] = useState();
  const [chat, setChat] = useState({});
  const url = `/api/chat/fetchchats/${currentId}/${postedorbookedById}`;

  useEffect(() => {
    async function getMessages() {
      setLoading(true);
      if (!currentId || !postedorbookedById) return [];
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setChat(data?.chat);
        setMessages(data?.chat?.messages);
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (postedorbookedById) getMessages();
  }, [url, currentId, postedorbookedById, setMessages]);
  useEffect(() => {
    setTimeout(() => {
      lastmsg.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    const channel = pusherClient.subscribe(`chat-channel`);
    channel.bind("new-message", (newmessage) => {
      setMessages((messages) => [...messages, newmessage]);
      // setAllGigs(data);
      // setPubGigs(data);
      console.log(newmessage);
    });
  }, [messages, setMessages]);

  let msg = messages?.filter((message) => {
    return messages?.gigChat === gigid;
  });

  return (
    <div className="overflow-y-auto shadow-md shadow-zinc-100  border border-input  rounded-md element-with-scroll flex-1  p-2">
      {!loading &&
        messages?.length > 0 &&
        messages?.map((message) => {
          return (
            <div key={message._id} ref={lastmsg}>
              {" "}
              <Message
                myMessages={message}
                curr={currentId}
                other={postedorbookedById}
              />
            </div>
          );
        })}{" "}
      {loading && (
        <div>
          {[...Array(10)].map((_, idx) => {
            return <Skeleton key={idx} />;
          })}
        </div>
      )}
      {!loading && messages?.messages?.length === 0 && (
        <div className="h-full w-full flex justify-center items-center">
          <h6 className="text-gray-300 text-center font-mono">
            send a message to start a chat
          </h6>{" "}
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
