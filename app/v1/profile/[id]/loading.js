import { CircularProgress } from "@mui/material";
import React from "react";

const ProfileLoading = () => {
  return (
    <div className="h-full w-full justify-center items-center">
      <CircularProgress size="20px" sx={{ color: "blue", opacity: 0.4 }} />
    </div>
  );
};

export default ProfileLoading;
