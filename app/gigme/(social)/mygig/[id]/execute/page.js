import ClientOnly from "@/app/ClientOnly";
import Booker from "@/components/mygigComponent/Booker";
import Creator from "@/components/mygigComponent/Creator";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
import React from "react";

async function getMyGig(gigId) {
  const res = await fetch(`${checkEnvironment()}/api/gigs/getgig/${gigId}`);
  return res.json();
}
const MyGigPage = async ({ params }) => {
  const { userId } = auth();
  const myGig = await getMyGig(params.id);

  return (
    <div className="h-screen w-screen bg-black ">
      {myGig?.gigs?.bookedBy?.clerkId.includes(userId) && (
        <ClientOnly>
          <Creator myGig={myGig} />
        </ClientOnly>
      )}
      {myGig?.gigs?.postedBy?.clerkId.includes(userId) && (
        <ClientOnly>
          <Booker myGig={myGig} />
        </ClientOnly>
      )}
    </div>
  );
};

export default MyGigPage;
