import { getBookedPosted, getGig } from "@/app/server-actions/customGig";
import CustomGigComponent from "@/components/mygigComponent/CustomGigComponent";
import { checkEnvironment } from "@/utils";
import React from "react";

async function getMyGig(gigId) {
  const res = await fetch(`${checkEnvironment()}/api/gigs/getgig/${gigId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  return res.json();
}
// get a specific user
const CustomGig = async ({ params }) => {
  const booker = params.booker;
  const postedBy = params.posted;
  const gigId = params.gigid;
  const postedData = await getBookedPosted(postedBy);
  const bookerData = await getBookedPosted(booker);
  const gigData = await getMyGig(gigId);

  return (
    <div className="bg-zinc-800 h-full w-[100%] ">
      <CustomGigComponent
        booker={bookerData}
        postedBy={postedData}
        gig={gigData}
      />
    </div>
  );
};

export default CustomGig;
