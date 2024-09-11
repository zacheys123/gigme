"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Music, User } from "lucide-react";
import { Dashboard, Logout, PostAdd } from "@mui/icons-material";
import { Avatar, Box, Divider } from "@mui/material";
import Logo from "./Logo";
import { PropTypes } from "prop-types";
import Image from "next/image";
const ProfileNav = ({ user, loading }) => {
  const { userId } = useAuth();
  const pathname = usePathname();
  console.log(user);
  let inactiveLink =
    "flex gap-2 lg:mx-3 lg:my-[13px]  xl:mx-[6] xl:text-[17px] lg:text-[15px]  font-bold  font-mono    hover:opacity-55 transition-transform duration-200  hover:bg-gray-300/80 md:p-2 xl:p-5 transition-opacity duration-175 ease-out ";
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
                  ? `${activeLink} lg:hidden xl:hidden`
                  : `${inactiveLink} lg:hidden xl:hidden`
              }
              href={`/v1/profile/${userId}/user`}
            >
              <User />
              More Info
            </Link>
            <Divider />
            <Link
              className={
                pathname === `/v1/profile/${userId}/dashboard`
                  ? activeLink
                  : inactiveLink
              }
              href={`/v1/profile/${userId}`}
            >
              <Dashboard />
              DashBoard
            </Link>
            <Divider />{" "}
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
            </Link>
            <Divider />{" "}
            <Link
              className={
                pathname === `/v1/profile/${userId}/gigs`
                  ? activeLink
                  : inactiveLink
              }
              href={`/gigme/gigs/${userId}`}
            >
              <Music />
              Gigs
            </Link>
            <Divider />{" "}
            <Link className={inactiveLink} href={`/sign-out`}>
              <Logout />
              Logout
            </Link>
            <Divider />
          </div>
        </Box>
      </div>{" "}
      <div className="h-[200px] bg-gray-200 mb-3 rounded-xl p-2 gap-2">
        {!loading ? (
          <div className=" w-full flex justify-center flex-col mt-2">
            <div className=" w-full flex justify-center">
              {user?.user?.picture ? (
                <Image
                  width={90}
                  height={90}
                  className="w-[90px] h-[90px] rounded-full "
                  src={user?.user?.picture}
                  alt={user?.user?.username.split("")[0]}
                />
              ) : (
                <User className="h-[90px] w-[90px] text-center rounded-full" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-mono font-bold tracking-tighter">
                User:
                <span className="text-red-500">
                  {user?.user?.firstname} {user?.user?.lastname}
                </span>
              </div>
              <span className="font-mono font-semibold tracking-tighter ">
                Email:
                <span className="text-red-500">{user?.user?.email}</span>
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </aside>
  );
};

export default ProfileNav;

ProfileNav.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
};
