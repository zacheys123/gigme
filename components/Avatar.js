"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";

import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useStore from "@/app/zustand/useStore";

const AvatarComponent = ({ usercomm, posts }) => {
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  const { setLogout, setName } = useStore();

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
        <AvatarImage
          src={usercomm?.picture}
          className={posts}
          alt={user?.user?.firstname.split("")[0]}
        />

        <AvatarFallback>{usercomm?.firstname?.split("")[0]}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarComponent;
