import ClientOnly from "@/app/ClientOnly";
import Booker from "@/components/mygigComponent/BookedBy";
import Creator from "@/components/mygigComponent/CreatedBy";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
import React from "react";

async function getMyGig(gigId) {
  const res = await fetch(`${checkEnvironment()}/api/gigs/getgig/${gigId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
  });
  return res.json();
}
const MyGigPage = async ({ params }) => {
  const { userId } = auth();
  const myGig = await getMyGig(params.id);

  return (
    <div className="bg-zinc-800 h-[calc(100vh-80px)] w-[100%] ">
      {myGig?.gigs?.bookedBy?.clerkId.includes(userId) && (
        <Creator myGig={myGig} />
      )}
      {myGig?.gigs?.postedBy?.clerkId.includes(userId) && (
        <Booker myGig={myGig} />
      )}
    </div>
  );
};

export default MyGigPage;
