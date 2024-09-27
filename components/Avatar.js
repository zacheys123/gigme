"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";

import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useStore from "@/app/zustand/useStore";

const AvatarComponent = () => {
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  const { setLogout, setName } = useStore();

  console.log(user);
  const showName = () => {
    setName(true);
  };
  const RemoveName = () => {
    setName(false);
  };
  return (
    <div
      className="w-[40px] h-[40px] "
      onClick={() => setLogout(true)}
      onMouseOver={showName}
      onMouseLeave={RemoveName}
    >
      <Avatar>
        {user?.user?.picture && (
          <>
            <AvatarImage
              src={user?.user?.picture}
              className="w-[35px] h-[35px] rounded-full object-fit"
              alt={user?.user?.firstname.split("")[0]}
            />

            <AvatarFallback>
              {user?.user?.firstname.split("")[0]}
            </AvatarFallback>
          </>
        )}
      </Avatar>
      <Avatar>
        {user?.postedBy?.picture && (
          <>
            <AvatarImage
              src={user?.postedBy?.picture}
              className="w-[35px] h-[35px] rounded-full object-fit"
              alt={user?.postedBy?.firstname.split("")[0]}
            />

            <AvatarFallback>
              {user?.postedBy?.firstname.split("")[0]}
            </AvatarFallback>
          </>
        )}
      </Avatar>
    </div>
  );
};

export default AvatarComponent;
