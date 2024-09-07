"use client";
import React, { useState } from "react";
import FriendList from "./FriendList";
import clsx from "clsx";

const MoreInfoPage = ({ user }) => {
  const [friendData, setShowFriendData] = useState(false);
  const [postedGigsData, setShowPostedGigsData] = useState(false);
  const [bookedGigsData, setShowBookedGigsData] = useState(false);
  const [allGigsData, setShowAllGigsData] = useState(false);
  return (
    <div className="p-1">
      <div
        className={clsx(
          `
      

        `,
          friendData ? `flex-1 h-[100%]` : `flex-0`
        )}
      >
        <h2
          onClick={() => setShowFriendData((prev) => !prev)}
          className="text-[9px] w-[80%] py-2 px-1 font-bold text-white my-2 bg-neutral-500 rounded-md transition-all hover:bg-neutral-200 duration-100 "
        >
          All Following
        </h2>
        {friendData && <FriendList userId={user?.user?._id} />}
      </div>

      <div>
        {" "}
        <h2
          onClick={() => setShowPostedGigsData(true)}
          className="text-[9px] w-[80%] py-2 px-1 font-bold text-white my-2 bg-neutral-500 rounded-md transition-all hover:bg-neutral-200 duration-100 "
        >
          Posted Gigs
        </h2>{" "}
        {postedGigsData &&
          {
            /* <MyGigList userId={user?.id} /> */
          }}
      </div>
      <div>
        {" "}
        <h2
          onClick={() => setShowBookedGigsData(true)}
          className="text-[9px] w-[80%] py-2 px-1 font-bold text-white my-2 bg-neutral-500 rounded-md transition-all hover:bg-neutral-200 duration-100 "
        >
          Booked Gigs
        </h2>{" "}
        {bookedGigsData &&
          {
            /* <BookedGigList userId={user?.id} /> */
          }}
      </div>
      <div>
        {" "}
        <h2
          onClick={() => setShowAllGigsData(true)}
          className="text-[9px] w-[80%] py-2 px-1 font-bold text-white my-2 bg-neutral-500 rounded-md transition-all hover:bg-neutral-200 duration-100 "
        >
          All Gigs
        </h2>{" "}
        {allGigsData &&
          {
            /* <CompletedGigList userId={user?.id} /> */
          }}
      </div>
    </div>
  );
};

export default MoreInfoPage;
