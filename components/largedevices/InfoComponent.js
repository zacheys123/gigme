"use client";
import useStore from "@/app/zustand/useStore";
import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import ProfileComponent from "../userprofile/ProfileComponent";
import { useRouter } from "next/navigation";
import { dataObject } from "@/lib/largeDisplay";
import { getAllUsers } from "@/app/server-actions/getAllUsers";
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
    friendData,

    postedGigsData,

    bookedGigsData,

    allGigsData,
    musiciansLarge,
  } = useStore();
  let mygigs = allGigs?.gigs?.filter(
    (gig) => gig?.postedBy?._id === user?.user?._id
  );
  let bookedgigs = allGigs?.gigs?.filter(
    (gig) => gig?.bookedBy?._id === user?.user?._id
  );

  let usersFiltered = allUsers.filter(
    (user) => user?.instrument?.length > 0 && user?.instrument?.length !== 0
  );

  return (
    <div className="md:flex-1  lg:flex-1 overflow-auto ">
      {friendData ||
      postedGigsData ||
      bookedGigsData ||
      allGigsData ||
      musiciansLarge ? (
        <>
          {friendData && (
            <div className="flex h-full w-full">
              {user?.user?.followers?.length === 0 ? (
                <div className="h-full w-full flex justify-center items-center">
                  <h6 className="text-neutral-400 text-center font-mono">
                    No Followers yet
                  </h6>
                </div>
              ) : (
                <div className="flex flex-col">
                  <h6 className="text-[13px] font-bold underline text-neutral-400 text-center mb-2 bg-neutral-100 p-2 rounded-lg w-fit">
                    Followers
                  </h6>
                  <div className="flex gap-6 flex-wrap">
                    {dataObject.followers(user, allUsers, router)}
                  </div>
                </div>
              )}
            </div>
          )}
          {postedGigsData && (
            <div className="flex h-full w-full">
              {mygigs?.length === 0 ? (
                <div className="h-full w-full flex justify-center items-center">
                  <h6 className="text-neutral-400 text-center font-mono">
                    No Posted Gigs yet
                  </h6>
                </div>
              ) : (
                <div className="flex flex-col">
                  <h6 className="text-[13px] font-bold underline text-neutral-400 text-center mb-2 bg-neutral-100 p-2 rounded-lg w-fit">
                    All Your Posted Gigs
                  </h6>
                  <div className="flex gap-6 flex-wrap">
                    {dataObject.posted(user, allGigs, router)}
                  </div>
                </div>
              )}
            </div>
          )}
          {bookedGigsData && (
            <div className="flex h-full w-full">
              {bookedgigs?.length === 0 ? (
                <div className="h-full w-full flex justify-center items-center">
                  <h6 className="text-neutral-400 text-center font-mono">
                    No Booked Gigs yet
                  </h6>
                </div>
              ) : (
                <div className="flex flex-col">
                  <h6 className="text-[13px] font-bold underline text-neutral-400 text-center mb-2 bg-neutral-100 p-2 rounded-lg w-fit">
                    All Your Booked Gigs .
                  </h6>
                  <div className="flex gap-6 flex-wrap">
                    {dataObject.booked(user, allGigs, router)}
                  </div>
                </div>
              )}
            </div>
          )}
          {musiciansLarge && (
            <div className="flex h-full w-full">
              {!usersFiltered ? (
                <div className="h-full w-full flex justify-center items-center">
                  <h6 className="text-neutral-400 text-center font-mono">
                    No Musicians
                  </h6>
                </div>
              ) : (
                <div className="flex flex-col">
                  <h6 className="text-[13px] font-bold underline text-neutral-400 text-center mb-2 bg-neutral-100 p-2 rounded-lg w-fit">
                    All Users That Play An Instrument
                  </h6>{" "}
                  <div className="flex gap-6 flex-wrap">
                    {dataObject.musicians(user, allUsers, router)}{" "}
                  </div>
                </div>
              )}
            </div>
          )}
          {allGigsData && (
            <div className="flex h-full w-full">
              {allGigs?.length === 0 ? (
                <div className="h-full w-full flex justify-center items-center">
                  <h6 className="text-neutral-400 text-center font-mono">
                    No Gigs Posted yet
                  </h6>
                </div>
              ) : (
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
          )}
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <h6 className="text-neutral-500">Data to be displayed here</h6>
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
