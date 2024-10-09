import { handleRouting } from "@/utils";
import { useAuth } from "@clerk/nextjs";
import { Avatar } from "@mui/material";
import { Globe } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import AvatarComponent from "../Avatar";

const HeaderDetails = ({ posts, today, username, globe, posted, user }) => {
  const router = useRouter();
  const { userId } = useAuth();
  return (
    <div>
      <div className="flex items-center gap-2  mt-1">
        <Globe className={globe} size="16px" />
        <h5 className={posted}>posted {moment(posts?.createdAt).calendar()}</h5>
      </div>
      <div className="flex mt-2 items-center h-[40px]">
        <AvatarComponent
          usercomm={posts?.postedBy[0]}
          posts="w-[30px] h-[30px] rounded-full object-fit"
        />

        <h6 className={username}>{handleRouting(posts, userId)}</h6>
      </div>
    </div>
  );
};
export default HeaderDetails;
