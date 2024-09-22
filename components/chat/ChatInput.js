import { send } from "@/features/chat/sendMessage";
import { EmojiEmotions } from "@mui/icons-material";
import { CircularProgress, Input } from "@mui/material";
import { TextInput } from "flowbite-react";
import { Send } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { PropTypes } from "prop-types";
import { useFetchMessages } from "@/hooks/useFetchMessages";
import useStore from "@/app/zustand/useStore";
import InputEmoji from "react-input-emoji";
import { useListenMessage } from "@/hooks/useListenMessage";
import { useSocketContext } from "@/app/Context/socket";
const ChatInput = ({ currentId, postedorbookedById, gigId }) => {
  const { messages, setMessages } = useStore();
  const [loading, setLoading] = useState();
  const [text, setText] = useState("");
  const inputref = useRef();
  const [output, setOutput] = useState();
  console.log(output);

  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket === null) return;

    socket?.emit("sendMessage", { ...text, postedorbookedById });
    return () => socket?.off("newMessage"); // cleanup function to prevent memory leak  // eslint-disable-next-line
  }, [text, postedorbookedById, socket]);

  useEffect(() => {
    if (socket === null) return;
    socket?.on("getMessage", (data) => {
      setOutput(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket, setMessages]);
  const handleMessage = useCallback((ev) => {
    ev.preventDefault();

    let message = ev.target[0].value;

    send(
      currentId,
      postedorbookedById,
      message,
      setLoading,
      setMessages,
      gigId,
      setText,
      messages
    );
  }, []);

  useEffect(() => {
    inputref.current = text;
  }, []);
  console.log(inputref.current);
  return (
    <div className="w-full flex items-center gap-2 mt-2">
      <form
        onSubmit={handleMessage}
        className="flex items-center gap-2
       w-full  p-2"
      >
        <div className=" bg-neutral-100 rounded-full px-5 w-full   flex items-center gap-1">
          <span className="hover:cursor-pointer w-[30px]">🙂</span>
          {/* <InputEmoji/> */}
          <input
            ref={inputref}
            onChange={(ev) => {
              setText(ev.target.value);
            }}
            value={text}
            autoFocus
            type="text"
            placeholder="Type a Message...."
            className=" flex h-9  w-[100%] -ml-3 flex-1
            px-3 py-1  bg-inherit
        text-sm  transition-colors 
      placeholder:text-muted-foreground
         focus-visible:outline-none
         focus-visible:ring-0  disabled:cursor-not-allowed
          disabled:opacity-50"
          />

          <button className="h-[18px] " type="submit">
            {loading ? (
              <CircularProgress sx={{ fontSize: "12px" }} size="15px" />
            ) : (
              <Send sx={{ fontSize: "12px" }} size="17px" />
            )}{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;

ChatInput.propTypes = {
  currentId: PropTypes.string.isRequired,
  postedorbookedById: PropTypes.string.isRequired,
  gigId: PropTypes.string.isRequired,
};
