"use client";
import useStore from "@/app/zustand/useStore";
import { FollowTheSigns, People } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Edit2, Music, Text, User, Users } from "lucide-react";
import React from "react";
import { PropTypes } from "prop-types";
const SideBar = ({ user }) => {
  const {
    setShowFriendData,

    setShowPostedGigsData,

    setShowBookedGigsData,
    setShowMusiciansLarge,
    setShowAllGigsData,
    friendData,
    postedGigsData,
    bookedGigsData,
    allGigsData,
    musiciansLarge,
  } = useStore();
  let active =
    "my-9 bg-gray-400 p-2 rounded-full cursor-pointer hover:bg-gray-300 transition-all duration-75";
  let inactive = "my-9 cursor-pointer";

  return (
    <div className="lg:w-[70px] border border-neutral-600 border-t-0 border-b-0 flex justify-center items-center">
      <div className="h-full">
        <ul className="p-3">
          <li
            className={friendData ? active : inactive}
            onClick={() => {
              setShowFriendData(true);
              setShowPostedGigsData(false);
              setShowBookedGigsData(false);
              setShowAllGigsData(false);
              setShowMusiciansLarge(false);
            }}
          >
            <Badge badgeContent={user?.user?.followers?.length} color="warning">
              <Users sx={{ color: "white" }} className="text-white" />
            </Badge>{" "}
          </li>
          <li
            className={postedGigsData ? active : inactive}
            onClick={() => {
              setShowFriendData(false);
              setShowPostedGigsData(true);
              setShowBookedGigsData(false);
              setShowAllGigsData(false);
              setShowMusiciansLarge(false);
            }}
          >
            <Text sx={{ color: "white" }} className="text-white" />
          </li>
          <li
            className={bookedGigsData ? active : inactive}
            onClick={() => {
              setShowFriendData(false);
              setShowPostedGigsData(false);
              setShowBookedGigsData(true);
              setShowAllGigsData(false);
              setShowMusiciansLarge(false);
            }}
          >
            <Music sx={{ color: "white" }} className="text-white" />
          </li>
          <li
            className={allGigsData ? active : inactive}
            onClick={() => {
              setShowFriendData(false);
              setShowPostedGigsData(false);
              setShowBookedGigsData(false);
              setShowAllGigsData(true);
              setShowMusiciansLarge(false);
            }}
          >
            <Edit2 sx={{ color: "white" }} className="text-white" />
          </li>
          <li
            className={musiciansLarge ? active : inactive}
            onClick={() => {
              setShowFriendData(false);
              setShowPostedGigsData(false);
              setShowBookedGigsData(false);
              setShowAllGigsData(false);
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
SideBar.propTypes = {
  user: PropTypes.object,
};
