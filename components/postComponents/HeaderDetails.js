import { differenceInMinutes, handleRouting } from "@/utils";
import { useAuth } from "@clerk/nextjs";
import { Avatar } from "@mui/material";
import { Globe } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const HeaderDetails = ({ posts, today, username, globe, posted, user }) => {
  const router = useRouter();
  const { userId } = useAuth();
  return (
    <>
      <div className="flex items-center gap-2  mt-1">
        <Globe className={globe} size="16px" />
        <h5 className={posted}>posted {differenceInMinutes(posts, today)}</h5>
      </div>
      <div className="flex mt-1 items-center">
        {posts?.postedBy?.picture ? (
          <Image
            alt={posts?.postedBy?.firstname.split("")[0]}
            src={posts?.postedBy?.picture}
            width={20}
            height={20}
            className="w-[20px] h-[20px]  rounded-full"
          />
        ) : (
          <Avatar />
        )}{" "}
        <h6 className={username}>{handleRouting(posts, userId)}</h6>
      </div>
    </>
  );
};
export default HeaderDetails;
