import { Chat, Create, Preview } from "@mui/icons-material";
import { Box } from "@mui/material";
import { View, Watch } from "lucide-react";
import React from "react";
import GigData from "./GigData";

const CustomGigComponent = ({ booker, postedBy, gig }) => {
  console.log("booker:", booker);
  console.log("postedby:", postedBy);
  console.log("My gig:", gig);
  return (
    <div className="animate-in size-full h-full overflow-hidden">
      <div className="bg-pink-900 h-[50px] w-full ">
        <div className="w-full h-full flex items-center my-auto">
          <div className="flex items-center gap-4 mr-5">
            <Create className="size-7 text-gray-400 ml-5" />
            <Preview className="size-7 text-gray-400 ml-1" />
          </div>
          <Box className="flex items-center flex-1">
            <h6 className="text-[12px] font-bold text-neutral-400">
              PostedBy:
            </h6>
            <div className="flex flex-col p-1">
              <h6 className="text-[12px] text-neutral-300 flex-1">{`${postedBy?.firstname} ${postedBy?.lastname}`}</h6>
              <h6 className="text-[12px] text-neutral-400 flex-1">
                {postedBy?.email}
              </h6>
            </div>
          </Box>
          <Chat className="size-7 text-blue-400 mr-4" />
        </div>
      </div>
      <div className="w-full max-h-[calc(100vh-50px)] overflow-y-auto bg-gradient-to-br to-pink-950 via-gray-900 from-amber-800">
        <h6 className="text-[15px] text-gray-400 ml-4 mt-3">
          <GigData booker={booker} posted={postedBy} gig={gig?.gigs} />
        </h6>
      </div>
    </div>
  );
};

export default CustomGigComponent;
// http://localhost:3000/gigme/customgig/66be9659b43fc1ab1ab7c0a5/66812db6b6b239edf9c8fe9f