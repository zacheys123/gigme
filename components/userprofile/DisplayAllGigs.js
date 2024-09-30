"use client";
import React from "react";
import { PropTypes } from "prop-types";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import AvatarComponent from "../Avatar";

const DisplayAllGigs = ({ gigs = {}, user = {} }) => {
  const router = useRouter();

  return (
    <div className="overflow-y-scroll">
      {gigs?.gigs
        ?.filter((g) => g.isTaken === false)
        .map((gig) => (
          <div
            key={gig.id}
            className=" h-full w-full"
            onClick={() => {
              if (gig?.isPending === false) {
                return router.push(`/gigme/gigs/${gig?.clerkId}`);
              }
              if (
                gig?.bookedBy?._id.includes(user?.user?._id) &&
                gig?.isPending === true
              ) {
                return router.push(`/gigme/mygig/${gig?._id}/execute`);
              }
              return router.push(`/v1/profile/${gig?.clerkId}`);
            }}
          >
            <div className="flex  gap-1 m-4">
              {gig?.bookedBy?.picture || gig?.postedBy?.picture ? (
                <Image
                  src={gig?.bookedBy?.picture || gig?.postedBy?.picture}
                  alt={
                    gig?.bookedBy?.username.split("")[0] ||
                    gig?.postedBy?.username.split("")[0]
                  }
                  width={17}
                  height={17}
                  className="h-[17px] w-[17px] rounded-full"
                />
              ) : (
                <Avatar
                  className="rounded-full h-[15px] w-[15px]"
                  sx={{ height: "15px", width: "15px" }}
                />
              )}
              {/* <AvatarComponent usercomm={gig?.bookedBy || gig?.postedBy}     className="h-[17px] w-[17px] rounded-full" />
               */}
              <div className="flex items-center justify-between  bg-gray-400 rounded-md h-fit whitespace-nowrap  p-1 min-w-[190px]">
                <div>
                  {" "}
                  <h6 className="text-[9px] font-bold">{gig.title}</h6>
                  <h6 className="text-[9px] font-bold">
                    {" "}
                    {gig?.postedBy?.username || gig?.bookedBy?.username}
                  </h6>
                  <h6 className="text-[9px] font-bold">
                    {" "}
                    {gig?.bussinesscat === "full"
                      ? "FullBand"
                      : gig?.bussinesscat === "personal"
                      ? "Individual Gig"
                      : "Mixed Musicians Gig"}
                  </h6>
                  <h6 className="text-[9px] font-bold"> Price: {gig.price}</h6>
                  <h6 className="text-[9px] font-bold text-red-700">
                    {gig?.isPending &&
                    gig?.bookedBy?._id.includes(user?.user?._id)
                      ? "You booked!!!"
                      : gig?.isPending
                      ? "booked"
                      : ""}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DisplayAllGigs;
DisplayAllGigs.propTypes = {
  gigs: PropTypes.object,
  user: PropTypes.object,
};
