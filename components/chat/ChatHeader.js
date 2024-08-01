import { Box } from "@mui/material";
import Image from "next/image";
import { PropTypes } from "prop-types";
import React from "react";

const ChatHeader = ({ myGig }) => {
  return (
    <div className="w-full border-0 border-b-slate-900 shadow-sm h-[40] p-1 mb-2 bg-gray-300 rounded-sm ">
      <div className="flex gap-1 items-center">
        {myGig?.gigs?.bookedBy?.picture && (
          <div className="h-full">
            <Image
              src={myGig?.gigs?.bookedBy?.picture}
              width={20}
              height={20}
              alt="profile"
              className="rounded-full w-[20px] h-[20px]"
            />
          </div>
        )}
        <Box className="flex flex-col ">
          <h6 className="title  text-red-400">
            {myGig?.gigs?.bookedBy?.firstname}
          </h6>
          <span className="link text-white">Active 3hrs ago...</span>
        </Box>
      </div>
    </div>
  );
};

export default ChatHeader;
ChatHeader.propTypes = {
  myGig: PropTypes.object,
};
