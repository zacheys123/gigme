"use client";
import React, { useState } from "react";
import FriendList from "./FriendList";
import clsx from "clsx";
import BookedGigList from "./BookedGigList";
import MyGigList from "./MyGigList";
import CompletedGigList from "./CompletedGigList";
import FellowMusicians from "./FellowMusicians";
import useStore from "@/app/zustand/useStore";
import { PropTypes } from "prop-types";
import { useAuth } from "@clerk/nextjs";
const MoreInfoPage = ({ user, allUsers }) => {
  const { userId } = useAuth();
  const {
    friendData,
    setShowFriendData,
    postedGigsData,
    setShowPostedGigsData,
    bookedGigsData,
    setShowBookedGigsData,
    allGigsData,
    setShowAllGigsData,
  } = useStore();
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
          onClick={() => {
            setShowFriendData((prev) => !prev);
            setShowPostedGigsData(false);
            setShowBookedGigsData(false);
            setShowAllGigsData(false);
          }}
          className=" w-[80%] py-2 px-1 font-bold text-yellow-200 text-[12px] my-2 bg-neutral-400 rounded-md transition-all hover:bg-neutral-200 hover:text-black duration-100 "
        >
          All Following
        </h2>
        {friendData && <FriendList userId={user?.user?._id} />}
      </div>

      <div>
        {" "}
        <h2
          onClick={() => {
            setShowPostedGigsData((prev) => !prev);
            setShowFriendData(false);
            setShowBookedGigsData(false);
            setShowAllGigsData(false);
          }}
          className=" w-[80%] py-2 px-1 font-bold  text-yellow-200 text-[12px] my-2 bg-neutral-500 rounded-md transition-all hover:bg-neutral-200 hover:text-black duration-100 "
        >
          Posted Gigs
        </h2>{" "}
        {postedGigsData && <MyGigList userId={user?.user?._id} />}
      </div>
      <div>
        {" "}
        <h2
          onClick={() => {
            setShowBookedGigsData((prev) => !prev);
            setShowPostedGigsData(false);
            setShowFriendData(false);
            setShowAllGigsData(false);
          }}
          className=" text-yellow-200 text-[12px] w-[80%] py-2 px-1 font-bold  my-2 bg-neutral-500 rounded-md transition-all hover:bg-neutral-200 hover:text-black duration-100 "
        >
          Booked Gigs
        </h2>{" "}
        {bookedGigsData && <BookedGigList userId={user?.user?._id} />}
      </div>
      <div>
        {" "}
        <h2
          onClick={() => {
            setShowAllGigsData((prev) => !prev);
            setShowPostedGigsData(false);
            setShowBookedGigsData(false);
            setShowFriendData(false);
          }}
          className=" text-yellow-200 text-[12px] w-[80%] py-2 px-1 font-bold  my-2 bg-neutral-500 rounded-md transition-all hover:bg-neutral-200 hover:text-black duration-100 "
        >
          All Gigs
        </h2>{" "}
        {allGigsData && <CompletedGigList userId={user?.user?._id} />}
      </div>
      <section className="flex flex-col ">
        <h6 className="text-white text-[15px] font-bold mt-2 underline">
          Musicians you may know
        </h6>

        <div
          className="element-with-scroll h-full w-[full] bg-gray-300 flex flex-wrap "
          onClick={() => {
            setShowFriendData(false);
            setShowPostedGigsData(false);
            setShowBookedGigsData(false);
            setShowAllGigsData(false);
          }}
        >
          {" "}
          <FellowMusicians userId={user?.user?._id} allUsers={allUsers} />
        </div>
      </section>
      <div>
        <h6>
          if you would like to update your personal data{" "}
          <Link
            href={`/v1/profile/${userId}/user`}
            className="text-blue-600 font-mono mx-1"
          >
            click here
          </Link>
          to redirect you to your profile page.
        </h6>
      </div>
    </div>
  );
};

export default MoreInfoPage;
MoreInfoPage.propTypes = {
  user: PropTypes.object,
  allUsers: PropTypes.object,
};
