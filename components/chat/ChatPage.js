"use client";
import { useFetchMessages } from "@/hooks/useFetchMessages";
import { PropTypes } from "prop-types";
import React, { useCallback, useEffect, useRef } from "react";
import Message from "./Message";
import Skeleton from "./Skeleton";
import { useGlobalContext } from "@/app/Context/store";
import { useParams } from "next/navigation";
import { useListenMessage } from "@/hooks/useListenMessage";

const ChatPage = ({ currentId, postedorbookedById, gigId }) => {
  const { gigid } = useParams();
  const { loading } = useFetchMessages(currentId, postedorbookedById);
  const { output } = useListenMessage();
  const {
    userState: { messages },
    setUserState,
  } = useGlobalContext();

  const lastmsg = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastmsg.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  let msg = messages?.messages?.filter((message) => {
    return messages?.gigChat === gigid;
  });
  console.log(output);
  return (
    <div className="overflow-y-auto shadow-md shadow-zinc-100  border border-input  rounded-md element-with-scroll flex-1  p-2">
      {!loading &&
        msg?.length > 0 &&
        msg?.map((message) => {
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
      {!loading && msg?.length === 0 && (
        <h6 className="text-gray-300">send a message to start a chat</h6>
      )}
    </div>
  );
};

export default ChatPage;
ChatPage.propTypes = {
  currentId: PropTypes.string?.isRequired,
  postedorbookedById: PropTypes.string?.isRequired,
};
