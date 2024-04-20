"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Music, User } from "lucide-react";
import { Dashboard, Logout, PostAdd } from "@mui/icons-material";
const ProfileNav = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="p-3  bg-gray-800/80 w-[300px] h-screen flex flex-col justify-center">
      <div>
        <Link className="flex gap-2 m-3 text-1xl" href={`${pathname}/user`}>
          <User />
          More Info
        </Link>
        <Link
          className="flex gap-2 m-3 text-1xl"
          href={`${pathname}/dashboard`}
        >
          <Dashboard />
          DashBoard
        </Link>{" "}
        <Link className="flex gap-2 m-3 text-1xl" href={`${pathname}/posts`}>
          <PostAdd />
          Posts
        </Link>{" "}
        <Link className="flex gap-2 m-3 text-1xl" href={`${pathname}/gigs`}>
          <Music />
          Gigs
        </Link>{" "}
        <Link className="flex gap-2 m-3 text-1xl" href={`${pathname}/user`}>
          <Logout />
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default ProfileNav;
