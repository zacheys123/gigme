import { send } from "@/features/chat/sendMessage";
import { EmojiEmotions } from "@mui/icons-material";
import { CircularProgress, Input } from "@mui/material";
import { TextInput } from "flowbite-react";
import { Send } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { PropTypes } from "prop-types";
const ChatInput = ({ currentId, postedorbookedById, gigId }) => {
  const {
    userState: { messages },
    setUserState,
  } = useGlobalContext();

  const [loading, setLoading] = useState();
  const handleMessage = useCallback((ev) => {
    ev.preventDefault();
    let message = ev.target[0].value;

    send(
      currentId,
      postedorbookedById,
      message,
      setLoading,
      setUserState,
      messages,
      gigId
    );
  }, []);

  console.log(messages);
  return (
    <div className="w-full flex items-center gap-2 mt-2">
      <form
        onSubmit={handleMessage}
        className="flex items-center gap-2
       w-full  p-2"
      >
        <div className=" bg-neutral-100 rounded-full px-5 w-full   flex items-center gap-1">
          {!loading && (
            <span className="hover:cursor-pointer w-[30px]">🙂</span>
          )}
          <input
            autoFocus
            type="text"
            placeholder="Write something...."
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
