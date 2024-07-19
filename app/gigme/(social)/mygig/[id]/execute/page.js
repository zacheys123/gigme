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
  console.log(myGig.gigs);
  return (
    <div className="h-screen w-screen bg-black ">
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
