"use client";
import React from "react";
import { PropTypes } from "prop-types";

import { useRouter } from "next/navigation";
import GigDisplay from "./GigDisplay";

const DisplayBookedGigs = ({ gigs = {}, user = {} }) => {
  const router = useRouter();

  return (
    <div className="h-full w-full">
      {gigs?.gigs
        ?.filter((g) => g?.bookedBy?._id.includes(user?.user?._id))
        .map((gig) => (
          <GigDisplay
            key={gig._id}
            gig={gig}
            gigdescription={gig?.bookedBy}
            router={router}
            secondDiv="flex  gap-1 m-4"
            image="h-[17px] w-[17px] rounded-full"
            thirdDiv="flex items-center justify-between  bg-gray-400 rounded-md h-fit whitespace-nowrap  p-1 min-w-[190px]"
            title="text-[9px] font-bold text-white"
            imageno={17}
          />
        ))}
    </div>
  );
};

export default DisplayBookedGigs;
DisplayBookedGigs.propTypes = {
  gigs: PropTypes.object,
  user: PropTypes.object,
};
