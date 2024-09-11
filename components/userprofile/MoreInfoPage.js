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
import Link from "next/link";
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
    <div className="p-1 lg:hidden xl:hidden">
      <div
        className={clsx(
          `
      

        `,
          friendData ? `flex-1 h-[100%]` : `flex-0`
        )}
      >
        <h2
          onClick={() => {
            setShowFriendData(true);
            setShowPostedGigsData(false);
            setShowBookedGigsData(false);
            setShowAllGigsData(false);
          }}
          className=" w-[80%] py-2 px-1 font-bold text-yellow-200 text-[12px] my-2 bg-neutral-400 rounded-md transition-all hover:bg-neutral-200 hover:text-black duration-100 "
        >
          All Following
        </h2>
        {friendData && <FriendList user={user} allUsers={allUsers} />}
      </div>

      <div>
        {" "}
        <h2
          onClick={() => {
            setShowFriendData(false);
            setShowPostedGigsData(true);
            setShowBookedGigsData(false);
            setShowAllGigsData(false);
          }}
          className=" w-[80%] py-2 px-1 font-bold  text-yellow-200 text-[12px] my-2 bg-neutral-500 rounded-md transition-all hover:bg-neutral-200 hover:text-black duration-100 "
        >
          Posted Gigs
        </h2>{" "}
        {postedGigsData && <MyGigList user={user} />}
      </div>
      <div>
        {" "}
        <h2
          onClick={() => {
            setShowBookedGigsData(true);
            setShowPostedGigsData(false);
            setShowFriendData(false);
            setShowAllGigsData(false);
          }}
          className=" text-yellow-200 text-[12px] w-[80%] py-2 px-1 font-bold  my-2 bg-neutral-500 rounded-md transition-all hover:bg-neutral-200 hover:text-black duration-100 "
        >
          Booked Gigs
        </h2>{" "}
        {bookedGigsData && <BookedGigList user={user} />}
      </div>
      <div>
        {" "}
        <h2
          onClick={() => {
            setShowAllGigsData(true);
            setShowPostedGigsData(false);
            setShowBookedGigsData(false);
            setShowFriendData(false);
          }}
          className=" text-yellow-200 text-[12px] w-[80%] py-2 px-1 font-bold  my-2 bg-neutral-500 rounded-md transition-all hover:bg-neutral-200 hover:text-black duration-100 "
        >
          All Gigs
        </h2>{" "}
        {allGigsData && <CompletedGigList user={user} />}
      </div>
      <div className="flex flex-col ">
        <h6 className="text-white text-[15px] font-bold mt-2 underline">
          Musicians you may know
        </h6>{" "}
        <FellowMusicians user={user} allUsers={allUsers} />
      </div>
      <div className="my-5">
        <div className="text-gray-200  title p-2">
          if you would like to update your personal data{" "}
          <Link
            href={`/v1/profile/${userId}/user`}
            className="text-blue-600 font-mono mx-3 underline"
          >
            click here
          </Link>
          to redirect you to your profile page.
        </div>
      </div>
    </div>
  );
};

export default MoreInfoPage;
MoreInfoPage.propTypes = {
  user: PropTypes.object,
  allUsers: PropTypes.array,
};
