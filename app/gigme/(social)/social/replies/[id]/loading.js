import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen font-sans text-[11px]">
      <div className="flex flex-col gap-2  items-center">
        <CircularProgress size={"16px"} /> <h4>loading replies...</h4>
      </div>
    </div>
  );
};

export default LoadingPage;
