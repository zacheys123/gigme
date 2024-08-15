import { Box } from "@mui/material";
import React from "react";

const Skeleton = () => {
  return (
    <div className="chat chat-start flex w-52 flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-6 w-6 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="chat chat-end flex items-center gap-4">
        <div className="skeleton h-6 w-6 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
