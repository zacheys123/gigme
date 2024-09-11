import UsersButton from "../UsersButton";
import { UserButton, useAuth } from "@clerk/nextjs";

import { Badge, CircularProgress } from "@mui/material";
// import { useGlobalContext } from "@/app/Context/store";

import Link from "next/link";
import Logo from "../Logo";
import MobileNav from "./MobileNav";
import MobileSheet from "./MobileSheet";

import { AiFillMessage } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { User } from "lucide-react";

const FriendsMobileNav = () => {
  const { userId } = useAuth();
  return (
    <div className="shadow-sm shadow-black top-0 sticky min-w-[90%] mx-auto">
      <nav className="container  mx-auto max-w-[100vw] xl:w-[60vw] shadow-lg p-4 border-b-zinc-500 flex items-center justify-between">
        <Logo />
        <span className="flex items-center">
          <div className="flex flex-grow gap-6 items-center">
            <Link href="/gigme/social" className="text-white">
              <IoHome size="20px" />
            </Link>
            <Link href={`/v1/profile/${userId}`} className="text-white">
              <User size="20px" />
            </Link>
            <div>
              <Link href={`/gigme/gigs/${userId}`} className="text-white">
                <Badge badgeContent={4} color="warning">
                  {" "}
                  <FaBell size="20px" />
                </Badge>
              </Link>
            </div>
            <Link href="/gigme/search" className="text-white">
              <FaSearch size="20px" />
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </span>
      </nav>{" "}
    </div>
  );
};

export default FriendsMobileNav;
