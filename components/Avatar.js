"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";

const AvatarComponent = () => {
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  console.log(user);
  return (
    <div className="w-[40px] h-[40px]">
      {user?.user?.picture ? (
        <Image
          src={user?.user?.picture}
          width={30}
          height={30}
          className="w-[35px] h-[35px] rounded-full object-fit"
          alt={user?.user?.firstname.split("")[0]}
        />
      ) : (
        <Avatar
          className="w-[35px] h-[35px] rounded-full object-fit"
          sx={{ width: "35px", height: "35px", borderRadius: "100px" }}
        />
      )}
    </div>
  );
};

export default AvatarComponent;
