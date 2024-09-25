"use client";
import React from "react";
import { PropTypes } from "prop-types";
import { useRouter } from "next/navigation";
import GigDisplay from "./GigDisplay";
const DisplayPostedGigs = ({ gigs = {}, user = {} }) => {
  const router = useRouter();

  return (
    <div className="">
      {gigs?.gigs
        ?.filter((g) => g.postedBy._id.includes(user?.user?._id))
        .map((gig) => (
          <GigDisplay
            key={gig.id}
            gig={gig}
            gigdescription={gig?.postedBy}
            router={router}
            secondDiv="flex  gap-1 m-4"
            image="h-[17px] w-[17px] rounded-full"
            thirdDiv="flex items-center justify-between  bg-gray-400 rounded-md h-fit whitespace-nowrap  p-1 min-w-[190px]"
            title="text-[9px] font-bold"
            imageno={17}
          />
        ))}
    </div>
  );
};

export default DisplayPostedGigs;
DisplayPostedGigs.propTypes = {
  gigs: PropTypes.object,
  user: PropTypes.object,
};
