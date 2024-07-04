import Link from "next/link";
import React from "react";
import Logo from "../Logo";
import { Box } from "@mui/material";
import { Home, Menu, Music, Search, Settings, User } from "lucide-react";
import { Chat, Dashboard } from "@mui/icons-material";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
const MobileNav = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <div className="flex p-3 bg-gray-300 shadow-lg  items-center justify-between gap-2 lg:hidden">
      <Box className="flex items-center justify-center gap-3">
        <Logo />
      </Box>{" "}
      <div className="w-100 flex flex-row gap-8 justify-between items-center">
        {pathname === "/gigme/social" ? (
          ""
        ) : (
          <Link
            href="/gigme/social"
            className="flex flex-col items-center gap-3 "
          >
            <Home size="17px" />
          </Link>
        )}
        {pathname === "/gigme/search" ? (
          ""
        ) : (
          <Link
            href={`/gigme/search`}
            className="flex flex-col items-center gap-3"
          >
            <Search size="17px" />
          </Link>
        )}
        <Link
          href={`/v1/profile/${userId}`}
          className="flex flex-col items-center gap-3"
        >
          <User size="17px" />
        </Link>
        <Link
          href={`/gigme/gigs/${userId}`}
          className="flex flex-col items-center gap-3"
        >
          <Music size="17px" />
        </Link>{" "}
      </div>
      <UserButton size="17px" className="w-[17px] h-[17px]" />
    </div>
  );
};

export default MobileNav;
