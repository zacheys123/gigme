import { CircularProgress } from "@mui/material";
import React from "react";

const ProfileLoading = () => {
  return (
    <div className="h-[100vh] w-full justify-center items-center">
      Preparing Data...
      <CircularProgress size="20px" sx={{ color: "white", opacity: 0.4 }} />
    </div>
  );
};

export default ProfileLoading;
