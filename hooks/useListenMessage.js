import { global } from "@/actions";
import { useSocketContext } from "@/app/Context/SocketContext";
import { useGlobalContext } from "@/app/Context/store";
import React, { useEffect, useState } from "react";

export const useListenMessage = () => {
  const { socket } = useSocketContext;
  const [output, setOutput] = useState();
  const {
    userState: { messages },
    setUserState,
  } = useGlobalContext();
  useEffect(() => {
    socket?.on("newMessage", (message) => {
      setOutput(message);
      setUserState({
        type: global.SETMESSAGES,
        payload: [...messages?.messages, message],
      });
    });
    return () => socket?.off("newMessage"); // cleanup function to prevent memory leak  // eslint-disable-next-line
  }, [socket, messages, setUserState]);
  return { output };
};
