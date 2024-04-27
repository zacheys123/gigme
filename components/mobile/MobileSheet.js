"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, Menu, Music, Search, Settings, User } from "lucide-react";
import { Chat, Dashboard } from "@mui/icons-material";
import { UserButton, auth, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
const MobileSheet = ({ textColor, hidden }) => {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <Sheet
      className={`w-100 bg-gray-500 md:hidden ${hidden} flex
  `}
    >
      <SheetTrigger>
        <Menu className={`font-extrabold  ${textColor} text-neutral-600 `} />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="w-100 flex flex-row gap-2 justify-evenly items-center"
      >
        {pathname === "/gigme/social" ? (
          ""
        ) : (
          <Link
            href="/gigme/social"
            className="flex flex-col items-center gap-3 "
          >
            <Home />
            <SheetDescription>Home</SheetDescription>
          </Link>
        )}
        <Link
          href="/gigme/dashboard"
          className="flex flex-col items-center gap-3 "
        >
          {" "}
          <Dashboard />
          <SheetDescription>Dashboard</SheetDescription>
        </Link>
        <Link
          href={`/gigme/search`}
          className="flex flex-col items-center gap-3"
        >
          <Search /> <SheetDescription>Search</SheetDescription>
        </Link>{" "}
        <Link
          href={`/v1/profile/${userId}`}
          className="flex flex-col items-center gap-3"
        >
          <User /> <SheetDescription>Profile</SheetDescription>
        </Link>
        <Link
          href={`/gigme/gigs/${userId}`}
          className="flex flex-col items-center gap-3"
        >
          <Music /> <SheetDescription>Gigs</SheetDescription>
        </Link>{" "}
        <Link href="/gigme/chat" className="flex flex-col items-center gap-3">
          <Chat /> <SheetDescription>Chat</SheetDescription>
        </Link>{" "}
        <Link href="/settings" className="flex flex-col items-center gap-3">
          <Settings /> <SheetDescription>Settings</SheetDescription>
        </Link>{" "}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
