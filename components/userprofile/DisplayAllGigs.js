"use client";
import React from "react";
import { PropTypes } from "prop-types";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const DisplayAllGigs = ({ gigs = {}, user = {} }) => {
  const router = useRouter();

  return (
    <div className="overflow-y-scroll">
      {gigs?.gigs
        ?.filter(
          (g) =>
            g?.bookedBy?._id.includes(user?.user?._id) ||
            g?.postedBy?._id.includes(user?.user?._id)
        )
        .map((gig) => (
          <div
            key={gig.id}
            className=" h-full w-full"
            onClick={() => router.push(`/gigme/mygig/${gig?._id}/execute`)}
          >
            <div className="flex  gap-1 m-4">
              {gig?.bookedby?.picture ? (
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
                <Avatar className="rounded-full h-[15px] w-[15px]" />
              )}
              <div className="flex items-center justify-between  bg-gray-400 rounded-md h-fit whitespace-nowrap  p-1 min-w-[190px]">
                <div>
                  {" "}
                  <h6 className="text-[9px] font-bold">{gig.title}</h6>
                  <h6 className="text-[9px] font-bold">
                    {" "}
                    {gig?.postedBy?.username || gig?.bookedBy?.usernam}
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
