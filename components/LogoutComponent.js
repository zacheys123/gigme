import { CircularProgress } from "@mui/material";
import React from "react";

const LogoutComponent = () => {
  return (
    <div className="w-full h-[100vh] flex  justify-center items-center ">
      <div className="flex flex-col items-center animate-pulse ">
        <CircularProgress size="17px" sx={{ color: "red" }} />
        logging out...
      </div>
    </div>
  );
};

export default LogoutComponent;
