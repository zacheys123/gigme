import { getBookedPosted } from "@/app/server-actions/getBookedPosted";
import CustomGigComponent from "@/components/mygigComponent/CustomGigComponent";
import React from "react";

// get a specific user
const CustomGig = async ({ params }) => {
  const booker = params.booker;
  const postedBy = params.posted;
  const postedData = await getBookedPosted(postedBy);
  const bookerData = await getBookedPosted(booker);

  return (
    <div className="bg-zinc-800 h-[calc(100vh-80px)] w-[100%] ">
      <CustomGigComponent booker={bookerData} postedBy={postedData} />
    </div>
  );
};

export default CustomGig;
