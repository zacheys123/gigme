"use client";
import { useAuth } from "@clerk/nextjs";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

const RouteProfile = ({ user }) => {
  const { userId } = useAuth();
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-4">
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
      <p className="text-sm text-gray-400">
        {user?.user?.email}
        <br />
        {user?.user?.phoneNo}
      </p>
    </div>
  );
};

export default RouteProfile;
