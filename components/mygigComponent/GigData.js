"use client";
import { CircularProgress } from "@mui/material"; // Ensure this import for loading spinner
import { Box } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import ButtonComponent from "../ButtonComponent";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";

const GigData = ({ booker, posted, gig }) => {
  const { userId } = useAuth();
  const [loadingPostId, setLoadingPostId] = useState(null);
  const { user } = useCurrentUser(userId);

  const bookGig = () => {
    // Placeholder booking logic
  };

  return (
    <div className="w-[90vw] max-w-[900px] p-6 rounded-2xl bg-transparent-900 shadow-lg mx-auto -mt-8 overflow-y-auto">
      {/* Content omitted for brevity */}

      <ButtonComponent
        variant={"destructive"}
        classname={`h-[40px] text-[9px] my-1 font-bold max-w-[252px] transition-colors duration-200 ${
          loadingPostId
            ? "bg-red-600 opacity-75 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-700"
        }`}
        onclick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          if (!user) {
            console.log("User data is not available yet.");
            return;
          }
          setLoadingPostId(gig?.gigs?._id);
          setTimeout(() => {
            setLoadingPostId(null);
            bookGig();
          }, 2000);
        }}
        title={
          loadingPostId === gig?.gigs?._id ? (
            <div className="flex items-center">
              <CircularProgress
                size="14px"
                sx={{ color: "white", marginRight: "8px" }}
              />
              <span className="text-white text-[11px]">Booking...</span>
            </div>
          ) : (
            <span className="text-[11px]">😜Book Gig</span>
          )
        }
      />
    </div>
  );
};

export default GigData;
