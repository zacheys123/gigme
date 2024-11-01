"use client";
import { Box } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import ButtonComponent from "../ButtonComponent";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";

const GigData = ({ booker, posted, gig }) => {
  const { userId } = useAuth();
  console.log(gig?.gigs);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const [loadingPostId, setLoadingPostId] = useState(null);
  const { user } = useCurrentUser(userId);

  const bookGig = () => {};
  return (
    <div className="w-[90vw] max-w-[900px] p-6 rounded-2xl bg-transparent-900 shadow-lg mx-auto -mt-8 overflow-y-auto">
      {/* Booker Details */}
      <div className="flex flex-col bg-black bg-opacity-20 p-6 my-4 rounded-lg shadow-inner">
        <h6 className="text-neutral-200 underline mt-3 gigtitle bg-amber-700 p-2 mb-3 rounded-md">
          Your Details
        </h6>
        <Box className="flex justify-between items-center w-full h-[80px] py-4 border-b border-neutral-600">
          <div className="flex flex-col">
            <span className="text-neutral-400 ">Your Name</span>
            <span className="text-neutral-300  gigtitle">{`${booker?.firstname} ${booker?.lastname}`}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Your Email</span>
            <span className="text-neutral-300  gigtitle">{booker?.email}</span>
          </div>
        </Box>
        <Box className="flex justify-between items-center w-full h-[80px] py-4 border-b border-neutral-600">
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Your Instrument</span>
            <span className="text-neutral-300  gigtitle">
              {booker?.instrument}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Your Experience</span>
            <span className="text-neutral-300  gigtitle">
              {booker?.experience ? booker?.experience : "-"}
            </span>
          </div>
        </Box>
      </div>

      {/* Creator Details */}
      <div className="flex flex-col bg-black bg-opacity-20 p-6 my-4 rounded-lg shadow-inner">
        <h6 className="text-neutral-200 underline gigtitle bg-amber-700 p-2 mb-3 rounded-md">
          Gig Creator Details
        </h6>
        <Box className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Instrument Played</span>
            <span className="text-neutral-300  gigtitle">
              {posted?.instrument}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 title">City/State/Province</span>
            <span className="text-neutral-300  gigtitle">{posted?.city}</span>
          </div>
        </Box>
        <Box className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Phone Number</span>
            <span className="text-neutral-300  gigtitle">
              {posted?.contact || "+01 1234 545 68"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Creator Experience</span>
            <span className="text-neutral-300  gigtitle">
              {posted?.experience || "-"}
            </span>
          </div>
        </Box>
      </div>

      {/* Gig Details */}
      <div className="flex flex-col bg-black bg-opacity-20 p-6 my-4 rounded-lg shadow-inner">
        <h6 className="text-neutral-200 underline gigtitle bg-amber-700 p-2 mb-3 rounded-md">
          Gig Details
        </h6>
        <Box className="flex flex-col gap-4">
          <div className="flex flex-col my-2">
            <span className="text-neutral-400 title">Gig Title</span>
            <span className="text-neutral-300  gigtitle">{gig?.title}</span>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-neutral-400 title">Description</span>
            <span className="text-neutral-300  gigtitle">
              {gig?.description}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-neutral-600 pt-4">
            <div className="flex flex-col">
              <span className="text-neutral-400 title">Pay</span>
              <span className="text-neutral-300  gigtitle">{gig?.price}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-400 title">Location</span>
              <span className="text-neutral-300  gigtitle">
                {gig?.location}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center border-t border-neutral-600 pt-4">
            <div className="flex flex-col">
              <span className="text-neutral-400 title">Type</span>
              <span className="text-neutral-300  gigtitle">
                {gig?.bussinesscat === "personal" &&
                  `Individual Gig: ${gig?.category}`}
                {gig?.bussinesscat === "fullband" && "Fullband Gig"}
              </span>
            </div>
            {gig?.bussinesscat === "other" && (
              <div>
                <span className="text-neutral-400 underline">
                  Selected Musicians
                </span>
                {gig?.bandCategory?.map((g) => (
                  <ul key={g}>
                    <li className="text-neutral-200">{g}</li>
                  </ul>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col border-t border-neutral-600 pt-4">
            <span className="text-neutral-400 title">Date</span>
            <span className="text-neutral-300  gigtitle">
              {new Date(gig?.date).toLocaleString("en-Us", options)}
            </span>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-neutral-400 title">Time</span>
            <span className="text-neutral-300  gigtitle">
              {gig?.time?.from} to {gig?.time?.to}
            </span>
          </div>
        </Box>
      </div>
      <ButtonComponent
        //   disabled={user ? true : false}
        variant={"destructive"}
        classname=" h-[40px] text-[9px] my-1 font-bold max-w-[252px] "
        onclick={(ev) => {
          // After the operation, you can handle the logic for reading the post
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
            <CircularProgress
              size="10px"
              sx={{ color: "white", fontWeight: "bold" }}
            />
          ) : (
            <span className="text-[11px]">😜Book Gig </span>
          )
        }
      />
    </div>
  );
};

export default GigData;
