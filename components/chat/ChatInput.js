import { Input } from "@mui/material";
import { TextInput } from "flowbite-react";
import { Send } from "lucide-react";
import React from "react";

const ChatInput = () => {
  return (
    <div className="w-full flex items-center gap-2">
      <input
        type="text"
        value=""
        placeholder="Write something...."
        className=" flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 
        text-sm shadow-sm transition-colors 
      placeholder:text-muted-foreground
         focus-visible:outline-none
         focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Send />
    </div>
  );
};

export default ChatInput;
