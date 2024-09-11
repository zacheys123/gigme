"use client";
import useStore from "@/app/zustand/useStore";
import { FollowTheSigns, People } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Edit2, Music, Text, User, Users } from "lucide-react";
import React from "react";

const SideBar = () => {
  const {
    friendDataLarge,
    setShowFriendDataLarge,
    postedGigsDataLarge,
    setShowPostedGigsDataLarge,
    bookedGigsDataLarge,
    setShowBookedGigsDataLarge,

    musiciansLarge,
    setShowMusiciansLarge,
    allGigsLarge,
    setShowAllGigsLarge,
  } = useStore();
  let active =
    "my-9 bg-gray-400 p-2 rounded-full cursor-pointer hover:bg-gray-300 transition-all duration-75";
  let inactive = "my-9 cursor-pointer";

  return (
    <div className="lg:w-[70px] border border-neutral-600 border-t-0 border-b-0 flex justify-center items-center">
      <div className="h-full">
        <ul className="p-3">
          <li
            className={!friendDataLarge ? active : inactive}
            onClick={() => {
              setShowFriendDataLarge(false);
              setShowPostedGigsDataLarge(false);
              setShowBookedGigsDataLarge(false);
              setShowAllGigsLarge(false);
              setShowMusiciansLarge(false);
            }}
          >
            <Badge badgeContent={4} color="warning">
              <Users sx={{ color: "white" }} className="text-white" />
            </Badge>{" "}
          </li>
          <li
            className={postedGigsDataLarge ? active : inactive}
            onClick={() => {
              setShowFriendDataLarge(true);
              setShowPostedGigsDataLarge(true);
              setShowBookedGigsDataLarge(false);
              setShowAllGigsLarge(false);
              setShowMusiciansLarge(false);
            }}
          >
            <Text sx={{ color: "white" }} className="text-white" />
          </li>
          <li
            className={bookedGigsDataLarge ? active : inactive}
            onClick={() => {
              setShowFriendDataLarge(true);
              setShowPostedGigsDataLarge(false);
              setShowBookedGigsDataLarge(true);
              setShowAllGigsLarge(false);
              setShowMusiciansLarge(false);
            }}
          >
            <Music sx={{ color: "white" }} className="text-white" />
          </li>
          <li
            className={allGigsLarge ? active : inactive}
            onClick={() => {
              setShowFriendDataLarge(true);
              setShowPostedGigsDataLarge(false);
              setShowBookedGigsDataLarge(false);
              setShowAllGigsLarge(true);
              setShowMusiciansLarge(false);
            }}
          >
            <Edit2 sx={{ color: "white" }} className="text-white" />
          </li>
          <li
            className={musiciansLarge ? active : inactive}
            onClick={() => {
              setShowFriendDataLarge(true);
              setShowPostedGigsDataLarge(false);
              setShowBookedGigsDataLarge(false);
              setShowAllGigsLarge(false);
              setShowMusiciansLarge(true);
            }}
          >
            <People sx={{ color: "white" }} className="text-white" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
