import { Box } from "@mui/material";
import moment from "moment";
import React from "react";

const GigData = ({ booker, posted, gig }) => {
  console.log(gig?.gigs);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  };

  return (
    <div className="w-[90vw] p-3 rounded-xl pt-2 max-h-full overflow-y-auto">
      {/* begining */}
      <div className="flex flex-col bg-black bg-opacity-20 px-6">
        <h6 className="title text-neutral-400 underline mt-3 bg-amber-700 p-2 mb-3 rounded-md">
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
      <div className="flex flex-col bg-black bg-opacity-20 px-6 my-4 gap-2 pb-7">
        <Box className="flex flex-col justify-between  w-full h-[140px] my-4 border-1 py-3 gap-3 border-b-neutral-300">
          <h6 className="title text-neutral-400 underline mt-3 bg-amber-700 p-2 mb-3 rounded-md">
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
        <Box className="flex flex-col justify-between  w-full h-[80px] my-2 border-1  gap-2 border-b-neutral-300">
          <div className="flex flex-col  mt-4 gap-3">
            <span className="title text-neutral-400"> Phone Number</span>
            <span className="title text-neutral-500 -mt-3">
              {posted?.contact || "+01 1234 545 68"}
            </span>
          </div>

          <div className="flex flex-col mb-3 ">
            <span className="title text-neutral-400">Creator experience</span>
            <span
              className={
                posted?.experience ? "title text-neutral-500 " : "text-gray-200"
              }
            >
              {posted?.experience ? posted.experience : "-"}
            </span>
          </div>
        </Box>
      </div>
      {/* end */}
      <div className="flex flex-col bg-black bg-opacity-20 px-6 my-4">
        <Box className="flex flex-col gap-2 justify-between w-full h-[170px] my-4 border-1 border-b-neutral-300">
          <h6 className="title text-neutral-400 underline mt-3 bg-amber-700 p-2 mb-3 rounded-md">
            Gig details here
          </h6>
          <div className="flex flex-col my-2 ">
            <span className="title text-neutral-400"> Gig Title </span>
            <span className="title text-neutral-500 ">{gig?.title}</span>
          </div>

          <div className="flex flex-col h-fit my-2">
            <span className="title text-neutral-400">Gig Description</span>
            <span className="title text-neutral-500">{gig?.description}</span>
          </div>
        </Box>
        <Box className="flex justify-between items-center w-full h-[50px] mt-[30px] border-1 border-b-neutral-300">
          <div className="flex flex-col ">
            <span className="title text-neutral-400">Gig Pay</span>
            <span className="title text-neutral-500">{gig?.price}</span>
          </div>

          <div className="flex flex-col ">
            <span className="title text-neutral-400">Gig Location</span>
            <span className="title text-neutral-500">{gig?.location}</span>
          </div>
        </Box>
        <Box
          className={
            gig?.bussinesscat === "other"
              ? "flex justify-between items-center w-full h-[120px] mt-3 border-1 border-b-neutral-300"
              : "flex justify-between items-center w-full h-[20px] mt-3 border-1 border-b-neutral-300"
          }
        >
          <div className="flex flex-col ">
            <span className="title text-neutral-400">Gig Type</span>
            <span className="title text-neutral-500">
              {gig?.bussinesscat === "personal" &&
                `Individual Gig: ${gig?.category}`}
              {gig?.bussinesscat === "fullband" && "Fullband Gig"}
            </span>
          </div>
          <div>
            {" "}
            {gig?.bussinesscat === "other" &&
              gig?.bandCategory?.map((g) => (
                <ul>
                  <span className="text-neutral-400 title underline text-center">
                    Selected Musicians Gig
                  </span>
                  <li id={g}>{g}</li>
                </ul>
              ))}
          </div>
        </Box>{" "}
        <Box className="flex flex-col justify-between  w-full h-[80px]  border-1  mt-4 border-b-neutral-300">
          <div className="flex flex-col ">
            <span className="title text-neutral-400">Gig Date</span>
            <span className="title text-neutral-400">
              {new Date(gig?.date).toLocaleString("en-Us", options)}
            </span>
          </div>
          <div className="flex flex-col ">
            <span className="title text-neutral-400">Gig Time</span>
            <span className="title text-neutral-400">
              {gig?.time?.from} to {gig?.time?.to}
            </span>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default GigData;
