"use client";
import useStore from "@/app/zustand/useStore";
import { useAuth } from "@clerk/nextjs";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { PropTypes } from "prop-types";
import React from "react";

const RouteProfile = ({ user }) => {
  const {
    setShowFriendData,

    setShowPostedGigsData,

    setShowBookedGigsData,

    setShowAllGigsData,
  } = useStore();
  const { userId } = useAuth();
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center gap-4"
      onClick={() => {
        setShowFriendData(false);
        setShowPostedGigsData(false);
        setShowBookedGigsData(false);
        setShowAllGigsData(false);
      }}
    >
      <img
        src={user?.user?.picture}
        alt="User profile picture"
        className="object-cover w-[200px] h-[200px] rounded-full"
      />
      <div className="flex items-center gap-2">
        <h3 className="text-xl text-white">
          {user?.user?.firstname} {user?.user?.lastname}
        </h3>
        <Pencil
          color="white"
          size="14px"
          onClick={() => router.push(`/v1/profile/${userId}/user`)}
        />
      </div>
      <p className="text-sm text-gray-400">{user?.user?.email}</p>
    </div>
  );
};

export default RouteProfile;

RouteProfile.propTypes = {
  user: PropTypes.object,
};
