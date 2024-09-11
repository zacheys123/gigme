"use client";
import useStore from "@/app/zustand/useStore";
import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import ProfileComponent from "../userprofile/ProfileComponent";
import { useRouter } from "next/navigation";
import { dataObject } from "@/lib/largeDisplay";
const InfoComponent = ({ user, allUsers }) => {
  const [allGigs, setAllgigs] = useState({});
  const router = useRouter();

  const getGigs = async () => {
    const res = await fetch("/api/gigs/allgigs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setAllgigs(data);
  };
  useEffect(() => {
    getGigs();
  }, []);
  //   An object model to display th pages/components

  const {
    friendDataLarge,
    setShowFriendDataLarge,
    postedGigsDataLarge,
    setShowPostedGigsDataLarge,
    bookedGigsDataLarge,
    setShowBookedGigsDataLarge,
    allGigsDataLarge,
    setShowAllGigsDataLarge,
    musiciansLarge,
    setShowMusiciansLarge,
    allGigsLarge,
    setShowAllGigsLarge,
  } = useStore();
  return (
    <div className="  lg:flex-1 overflow-auto ">
      {!friendDataLarge && (
        <div className="flex flex-col">
          <h6 className="text-[13px] font-bold underline text-neutral-400 text-center mb-2 bg-neutral-100 p-2 rounded-lg w-fit">
            Followers
          </h6>
          <div className="flex gap-6 flex-wrap">
            {dataObject.followers(user, allUsers, router)}
          </div>
        </div>
      )}
      {postedGigsDataLarge && (
        <div className="flex flex-col">
          <h6 className="text-[13px] font-bold underline text-neutral-400 text-center mb-2 bg-neutral-100 p-2 rounded-lg w-fit">
            All Your Posted Gigs
          </h6>
          <div className="flex gap-6 flex-wrap">
            {dataObject.posted(user, allGigs, router)}
          </div>
        </div>
      )}{" "}
      {bookedGigsDataLarge && (
        <div className="flex flex-col">
          <h6 className="text-[13px] font-bold underline text-neutral-400 text-center mb-2 bg-neutral-100 p-2 rounded-lg w-fit">
            All Your Booked Gigs
          </h6>
          <div className="flex gap-6 flex-wrap">
            {dataObject.booked(user, allGigs, router)}
          </div>
        </div>
      )}{" "}
      {musiciansLarge && (
        <div className="flex flex-col">
          <h6 className="text-[13px] font-bold underline text-neutral-400 text-center mb-2 bg-neutral-100 p-2 rounded-lg w-fit">
            All Users That Play An Instrument
          </h6>{" "}
          <div className="flex gap-6 flex-wrap">
            {dataObject.musicians(user, allUsers, router)}{" "}
          </div>
        </div>
      )}
      {allGigsLarge && (
        <div className="flex flex-col">
          <h6 className="text-[13px] font-bold underline text-neutral-400 text-center mb-2 bg-neutral-100 p-2 rounded-lg w-fit">
            All Gigs Posted And Booked
          </h6>{" "}
          <div className="flex gap-6 flex-wrap">
            {dataObject.allgigs(user, allGigs, router)}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoComponent;
InfoComponent.propTypes = {
  user: PropTypes.object,
  allUsers: PropTypes.array,
};
