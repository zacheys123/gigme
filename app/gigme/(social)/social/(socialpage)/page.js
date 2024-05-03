"use client";
import LeftBar from "@/components/socials/LeftBar";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const SocialPage = () => {
  return (
    <div className="flex-1 bg-gray-600 h-full">
      {" "}
      <Box className="w-[calc(100vw-40px)] h-fit mx-auto overflow-auto bg-red-200"></Box>
    </div>
  );
};

export default SocialPage;
