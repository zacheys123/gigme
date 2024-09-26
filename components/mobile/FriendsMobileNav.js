"use client";
import UsersButton from "../UsersButton";
import { UserButton, useAuth } from "@clerk/nextjs";

import { Badge, CircularProgress } from "@mui/material";
// import { useGlobalContext } from "@/app/Context/store";

import Link from "next/link";
import Logo from "../Logo";
import MobileNav from "./MobileNav";
import MobileSheet from "./MobileSheet";

import { AiFillMessage } from "react-icons/ai";
import { FaVideo } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaMusic } from "react-icons/fa6";
import AvatarComponent from "../Avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FaUser } from "react-icons/fa";
const FriendsMobileNav = () => {
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  // {`/gigme/chat/${gig?.bookedBy?.clerkId}/${gig?._id}`}
  return (
    <div className="shadow-sm shadow-black top-0 sticky min-w-[90%] mx-auto">
      <nav className="container  mx-auto max-w-[100vw] xl:w-[60vw] shadow-lg p-4 border-b-zinc-500 flex items-center justify-between">
        <span className="flex items-center">
          <div className="flex flex-grow gap-9 items-center">
            <Link href={`/gigme/gigs/${userId}`} className="text-white">
              <FaVideo size="17px" />
            </Link>
            <Link href={`/v1/profile/${userId}`} className="text-white">
              <FaUser size="17px" />
            </Link>
            <Link href={`/gigme/gigs/${userId}`} className="text-white">
              <FaMusic size="14px" />
            </Link>
            <div>
              <Link href="/" className="text-white">
                <Badge
                  badgeContent={user?.user?.followings.length}
                  color="warning"
                  sx={{ fontSize: "8px" }}
                >
                  <FaBell size="15px" />
                </Badge>
              </Link>
            </div>
            <Link href="/gigme/search" className="text-white">
              <FaSearch size="14px" />
            </Link>
            <AvatarComponent user={user} />
          </div>
        </span>
      </nav>{" "}
    </div>
  );
};

export default FriendsMobileNav;
