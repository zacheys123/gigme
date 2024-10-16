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
  });
  return res.json();
}
const MyGigPage = async ({ params }) => {
  const { userId } = auth();
  const myGig = await getMyGig(params.id);

  return (
    <ClientOnly>
      <div className="h-screen w-screen bg-black ">
        {myGig?.gigs?.bookedBy?.clerkId.includes(userId) && (
          <Creator myGig={myGig} />
        )}
        {myGig?.gigs?.postedBy?.clerkId.includes(userId) && (
          <Booker myGig={myGig} />
        )}
      </div>
    </ClientOnly>
  );
};

export default MyGigPage;
