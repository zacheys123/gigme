import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="h-[calc(75vh-150px)] w-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        {" "}
        <div className="gigtitle text-white flex flex-col gap-2 items-center">
          <span className="text-neutral-500"> loading gigs...</span>
          <CircularProgress
            sx={{ color: "inherit" }}
            size="10px"
            className="text-white  bg-gradient-to-r 
      from-red-400 to-yellow-400 via-orange-900 rounded-ss-xl rounded-es-full rounded-r-full
      "
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
