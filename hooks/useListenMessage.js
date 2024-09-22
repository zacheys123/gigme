import { global } from "@/actions";
import { useSocketContext } from "@/app/Context/socket";
import useStore from "@/app/zustand/useStore";

import React, { useEffect, useState } from "react";

export const useListenMessage = (otheruser, message) => {
  const { socket } = useSocketContext();
  const [output, setOutput] = useState();
  const { setMessages } = useStore();
  useEffect(() => {
    let s;
    let newuser;
    s = socket;
    newuser = otheruser;
    if (s === null) return;

    socket?.emit("sendMessage", { ...message, newuser });
    return () => socket?.off("newMessage"); // cleanup function to prevent memory leak  // eslint-disable-next-line
  }, [message]);

  useEffect(() => {
    if (socket === null) return;
    socket?.on("getMessage", (data) => {
      setOutput(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);
  return { output };
};
