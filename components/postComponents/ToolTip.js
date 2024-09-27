"use client";
import useStore from "@/app/zustand/useStore";
import React from "react";

const ToolTip = ({ id }) => {
  const { name } = useStore();
  return (
    <div>
      {name && (
        <h6 className="absolute right-2 bottom-0 top-[46px] bg-neutral-200 py-1 px-2 rounded-md tracking-wider h-fit title">
          {id?.user?.firstname} {id?.user?.lastname}
        </h6>
      )}
    </div>
  );
};

export default ToolTip;
