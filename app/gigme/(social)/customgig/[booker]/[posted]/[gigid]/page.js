import { getBookedPosted } from "@/app/server-actions/customGig";
import { getGig } from "@/app/server-actions/getBookedPosted";
import CustomGigComponent from "@/components/mygigComponent/CustomGigComponent";
import React from "react";

// get a specific user
const CustomGig = async ({ params }) => {
  const booker = params.booker;
  const postedBy = params.posted;
  const gigId = params.gigid;
  const postedData = await getBookedPosted(postedBy);
  const bookerData = await getBookedPosted(booker);
  const gigData = await getGig(gigId);

  return (
    <div className="bg-zinc-800 h-[calc(100vh-80px)] w-[100%] ">
      <CustomGigComponent
        booker={bookerData}
        postedBy={postedData}
        gig={gigData}
      />
    </div>
  );
};

export default CustomGig;
