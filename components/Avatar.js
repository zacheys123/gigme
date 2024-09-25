"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";

import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const AvatarComponent = ({ user, className }) => {
  const { userId } = useAuth();

  return (
    <div className="w-[40px] h-[40px]">
      {" "}
      {user?.user?.picture && (
        <Avatar>
          <AvatarImage
            src={user?.user?.picture}
            className={"w-[35px] h-[35px] rounded-full object-fit" || className}
            alt={user?.user?.firstname.split("")[0]}
          />

          <AvatarFallback>{user?.user?.firstname.split("")[0]}</AvatarFallback>
        </Avatar>
      )}
      {user?.postedBy && (
        <Avatar>
          <AvatarImage
            src={user?.postedBy?.picture}
            className="w-[20px] h-[20px]  rounded-full object-fit"
            alt={user?.postedBy?.firstname.split("")[0]}
          />

          <AvatarFallback>
            {user?.postedBy?.firstname.split("")[0]}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default AvatarComponent;
