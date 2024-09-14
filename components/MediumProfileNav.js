"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Dashboard, Logout, PostAdd } from "@mui/icons-material";
import { Home, Music, Search, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Transition from "./Transition";
import { usePathname } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaMusic } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CiMusicNote1 } from "react-icons/ci";
import AvatarComponent from "./Avatar";
const MediumProfileNav = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const [navStates, setNavStates] = useState({
    profile: false,
    dashboard: false,
    posts: false,
    gigs: false,
    settings: false,
    logout: false,
  });
  let variant = {
    initial: { x: ["-50px", "-20px", "0", "20px", "0"], opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: {
      ease: "easeIn",
      duration: 0.25,
    },
  };
  let inactiveLink = "";
  let activeLink = " text-2xl  rounded-xl";
  return (
    <div
      className={`hidden md:flex xl:hidden w-[30px]  flex-col gap-3  justify-center items-center ml-3 `}
    >
      <aside className="shadow-md shadow-slate-400 rounded-md p-3  flex flex-col justify-center items-center  h-[495px] gap-10 border-t-2 text-white ">
        <Link href={`/gigme/social`}>
          <Home />
        </Link>
        <Link
          href={`/v1/profile/${userId}/user`}
          className="flex items-center"
          onMouseOver={() =>
            setNavStates((prev) => {
              return { ...prev, profile: true };
            })
          }
          onMouseOut={() =>
            setNavStates((prev) => {
              return { ...prev, profile: false };
            })
          }
        >
          {pathname === `/v1/profile/${userId}/user` ? (
            <FaUserAlt className={activeLink} />
          ) : (
            <User className={activeLink} />
          )}
          {navStates.profile && (
            <Transition
              variant={variant}
              className={
                !navStates.profile
                  ? "text-white font-mono font-bold  z-50"
                  : "text-white font-mono font-bold absolute ml-9 z-50 shadow-md border-l-0 border py-2 px-4 rounded-r-full"
              }
            >
              Profile
            </Transition>
          )}
        </Link>{" "}
        <Link
          href={`/v1/profile/${userId}`}
          className="flex items-center "
          onMouseOver={() =>
            setNavStates((prev) => {
              return { ...prev, dashboard: true };
            })
          }
          onMouseOut={() =>
            setNavStates((prev) => {
              return { ...prev, dashboard: false };
            })
          }
        >
          {pathname === `/v1/profile/${userId}` ? (
            <Dashboard className={activeLink} />
          ) : (
            <MdOutlineDashboard className={activeLink} />
          )}
          {navStates.dashboard && (
            <Transition
              variant={variant}
              className={
                !navStates.dashboard
                  ? "text-white font-mono font-bold  z-50"
                  : "text-white font-mono font-bold absolute ml-9 z-50 shadow-md border-l-0 border py-2 px-4 rounded-r-full"
              }
            >
              Dashboard
            </Transition>
          )}
        </Link>{" "}
        <Link
          href={`/v1/profile/${userId}/posts`}
          onMouseOver={() =>
            setNavStates((prev) => {
              return { ...prev, posts: true };
            })
          }
          onMouseOut={() =>
            setNavStates((prev) => {
              return { ...prev, posts: false };
            })
          }
          className="flex items-center"
        >
          <PostAdd
            className={
              pathname === `/v1/profile/${userId}/posts`
                ? activeLink
                : inactiveLink
            }
          />{" "}
          {navStates.posts && (
            <Transition
              variant={variant}
              className={
                !navStates.posts
                  ? "text-white font-mono font-bold  z-50"
                  : "text-white font-mono font-bold absolute ml-9 z-50 shadow-md border-l-0 border py-2 px-4 rounded-r-full"
              }
            >
              Posts
            </Transition>
          )}
        </Link>{" "}
        <Link
          href={`/gigme/gigs/${userId}`}
          className="flex items-center"
          onMouseOver={() =>
            setNavStates((prev) => {
              return { ...prev, gigs: true };
            })
          }
          onMouseOut={() =>
            setNavStates((prev) => {
              return { ...prev, gigs: false };
            })
          }
        >
          {pathname === `/gigme/gigs/${userId}` ? (
            <Music className={activeLink} />
          ) : (
            <CiMusicNote1 className={activeLink} />
          )}
          {navStates.gigs && (
            <Transition
              variant={variant}
              className={
                !navStates.gigs
                  ? "text-white font-mono font-bold  z-50"
                  : "text-white font-mono font-bold absolute ml-9 z-50 shadow-md border-l-0 border py-2 px-4 rounded-r-full"
              }
            >
              Gigs
            </Transition>
          )}
        </Link>{" "}
        {pathname === "/gigme/search" ? (
          ""
        ) : (
          <Link
            href={`/gigme/search`}
            className="flex flex-col items-center gap-3"
          >
            <Search size="20px" />
          </Link>
        )}
        <Link
          href={`/v1/profile/${userId}/settings`}
          className="flex items-center"
          onMouseOver={() =>
            setNavStates((prev) => {
              return { ...prev, settings: true };
            })
          }
          onMouseOut={() =>
            setNavStates((prev) => {
              return { ...prev, settings: false };
            })
          }
        >
          {!pathname === `/v1/profile/${userId}/settings` ? (
            <Settings className={activeLink} />
          ) : (
            <IoSettingsOutline className={activeLink} />
          )}
          {navStates.settings && (
            <Transition
              variant={variant}
              className={
                !navStates.settings
                  ? "text-white font-mono font-bold  z-50"
                  : "text-white font-mono font-bold absolute ml-9 z-50 shadow-md border-l-0 border py-2 px-4 rounded-r-full"
              }
            >
              Settings
            </Transition>
          )}
        </Link>{" "}
        <AvatarComponent />
      </aside>
    </div>
  );
};

export default MediumProfileNav;
