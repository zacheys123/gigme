"use client";
import { useFetchMessages } from "@/hooks/useFetchMessages";
import { PropTypes } from "prop-types";
import React, { useCallback, useEffect, useRef } from "react";
import Message from "./Message";
import Skeleton from "./Skeleton";
import { useGlobalContext } from "@/app/Context/store";

const ChatPage = ({ currentId, postedorbookedById, messages, setMessages }) => {
  console.log(currentId, "" + "" + postedorbookedById);

  const { loading } = useFetchMessages(currentId, postedorbookedById);
  console.log(messages);
  const lastmsg = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastmsg.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="overflow-y-auto shadow-md shadow-zinc-100  border border-input  rounded-md element-with-scroll flex-1  p-2">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => {
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
      {!loading && messages.length === 0 && (
        <div>send a message to start a chat</div>
      )}
    </div>
  );
};

export default ChatPage;
ChatPage.propTypes = {
  currentId: PropTypes.String,
  postedorbookedById: PropTypes.String,
};
