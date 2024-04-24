"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Music, User } from "lucide-react";
import { Dashboard, Logout, PostAdd } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import Logo from "./Logo";
const ProfileNav = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  let inactiveLink =
    "flex gap-2 md:mx-3 md:my-[20px] x:my-[30px] xl:mx-[6] xl:text-[20px] text-1xl  font-bold  font-mono    hover:opacity-55 transition-transform duration-200  hover:bg-gray-300/80 md:p-2 xl:p-5 transition-opacity duration-175 ease-out ";
  let activeLink =
    inactiveLink +
    "bg-slate-600 text-white w-full p-2 pr-0 rounded-l-xl transition-none hover:bg-gray-800 hover:opacity-100";
  return (
    <aside className="hidden xl:flex  p-3  bg-white w-[360px] h-screen  flex-col justify-between">
      <div className="flex-grow bg-neutral-200 flex flex-col gap-3 items-center  p-4 mb-4">
        <Logo />
        <Box>
          <span className="text-black font-bold mb-3 text-center text-heading3">
            Update ,view your data
          </span>
          <div className="mt-[7px] p-4 pr-0">
            <Link
              className={
                pathname === `/v1/profile/${userId}/user`
                  ? activeLink
                  : inactiveLink
              }
              href={`/v1/profile/${userId}/user`}
            >
              <User />
              More Info
            </Link>
            <Link
              className={
                pathname === `/v1/profile/${userId}/dashboard`
                  ? activeLink
                  : inactiveLink
              }
              href={`/v1/profile/${userId}/dashboard`}
            >
              <Dashboard />
              DashBoard
            </Link>{" "}
            <Link
              className={
                pathname === `/v1/profile/${userId}/posts`
                  ? activeLink
                  : inactiveLink
              }
              href={`/v1/profile/${userId}/posts`}
            >
              <PostAdd />
              Posts
            </Link>{" "}
            <Link
              className={
                pathname === `/v1/profile/${userId}/gigs`
                  ? activeLink
                  : inactiveLink
              }
              href={`/v1/profile/${userId}/gigs`}
            >
              <Music />
              Gigs
            </Link>{" "}
            <Link className={inactiveLink} href={`/sign-out`}>
              <Logout />
              Logout
            </Link>
          </div>
        </Box>
      </div>{" "}
      <div className="h-[300px] bg-gray-200 mb-3 rounded-xl p-2">
        <div className=" w-full flex justify-center">
          <Avatar
            sx={{ width: "90px", height: "90px", marginBottom: ".9rem" }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono font-bold tracking-tighter">
            User:Zacharia Muigai
          </span>
          <span className="font-mono font-semibold tracking-tighter text-red-600">
            Email: zachy@gmail.com
          </span>
        </div>
      </div>
    </aside>
  );
};

export default ProfileNav;
