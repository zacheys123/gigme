import { Box } from "@mui/material";
import React from "react";

const GigData = ({ booker, posted, gig }) => {
  return (
    <div className="w-[90vw] p-3 rounded-xl pt-2 max-h-full overflow-y-auto">
      {/* begining */}
      <div className="flex flex-col bg-black bg-opacity-20 px-6">
        <h6 className="title text-neutral-400 underline mt-3 bg-amber-700 p-2 mb-3">
          Your Details
        </h6>
        <Box className="flex justify-between items-center w-full h-[50px] my-4 border-1 border-b-neutral-300">
          <div className="flex flex-col ">
            <span className="title text-neutral-400 flex-1">Your Name</span>
            <span className="title text-neutral-500 ">{`${booker?.firstname} ${booker?.lastname}`}</span>
          </div>

          <div className="flex flex-col ">
            <span className="title text-neutral-400">Your Email</span>
            <span className="title text-neutral-500 ">{booker?.email}</span>
          </div>
        </Box>
        <Box className="flex justify-between items-center w-full h-[80px] my-4 border-1 border-b-neutral-300">
          <div className="flex flex-col ">
            <span className="title text-neutral-400">Your instrument</span>
            <span className="title text-neutral-500 ">
              {booker?.instrument}
            </span>
          </div>

          <div className="flex flex-col ">
            <span className="title text-neutral-400">Your experience</span>
            <span className="title text-neutral-500 ">
              {booker?.experience}
            </span>
          </div>
        </Box>
      </div>
      {/* end */}
      {/* begining */}
      <div className="flex flex-col bg-black bg-opacity-20 px-6 my-4 gap-2">
        <Box className="flex flex-col justify-between  w-full h-[120px] my-4 border-1 py-3 gap-3 border-b-neutral-300">
          <h6 className="title text-neutral-400 underline mt-3 bg-amber-700 p-2 mb-3">
            Gig Creator Details
          </h6>
          <div className="flex flex-col ">
            <span className="title text-neutral-400"> Instrument Played</span>
            <span className="title text-neutral-500 ">
              {posted?.instrument}
            </span>
          </div>

          <div className="flex flex-col ">
            <span className="title text-neutral-400">
              Creator City/state/Province
            </span>
            <span className="title text-neutral-500 ">{posted?.city}</span>
          </div>
        </Box>
        <Box className="flex flex-col justify-between  w-full h-[80px] my-4 border-1 border-b-neutral-300">
          <div className="flex flex-col  mt-4">
            <span className="title text-neutral-400">Creator Phone Number</span>
            <span className="title text-neutral-500 ">{posted?.contact}</span>
          </div>

          <div className="flex flex-col ">
            <span className="title text-neutral-400">Creator experience</span>
            <span className="title text-neutral-500 ">
              {posted?.experience ? posted.experience : null}
            </span>
          </div>
        </Box>
      </div>
      {/* end */}
      <div className="flex flex-col bg-black bg-opacity-20 px-6 my-4">
        <Box className="flex flex-col gap-2 justify-between w-full h-[140px] my-4 border-1 border-b-neutral-300">
          <h6 className="title text-neutral-400 underline mt-3 bg-amber-700 p-2 mb-3">
            Gig details here
          </h6>
          <div className="flex flex-col ">
            <span className="title text-neutral-400">Gig Title</span>
            <span className="title text-neutral-400">{gig?.title}</span>
          </div>

          <div className="flex flex-col ">
            <span className="title text-neutral-400">Gig Description</span>
            <span className="title text-neutral-400">{gig?.description}</span>
          </div>
        </Box>
        <Box className="flex justify-between items-center w-full h-[80px] my-4 border-1 border-b-neutral-300">
          <div className="flex flex-col ">
            <span className="title text-neutral-400">Gig Pay</span>
            <span className="title text-neutral-400">{gig?.price}</span>
          </div>

          <div className="flex flex-col ">
            <span className="title text-neutral-400">Gig Location</span>
            <span className="title text-neutral-400">{gig?.location}</span>
          </div>
        </Box>
        <Box className="flex justify-between items-center w-full h-[80px] my-4 border-1 border-b-neutral-300">
          <div className="flex flex-col ">
            <span className="title text-neutral-400">Gig Prefference</span>
            <span className="title text-neutral-400">{gig?.bussinesscat}</span>
          </div>

          <div className="flex flex-col ">
            <span className="title text-neutral-400">Gig Date</span>
            <span className="title text-neutral-400">{gig?.price}</span>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default GigData;
