"use client";
import { useAuth } from "@clerk/nextjs";
import { Dashboard, Logout, PostAdd } from "@mui/icons-material";
import { Home, Music, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Transition from "./Transition";

const MediumProfileNav = () => {
  const { userId } = useAuth();
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
  return (
    <div
      className={`flex xl:hidden w-[30px]  flex-col gap-3  justify-center items-center `}
    >
      <aside className="bg-gray-700 p-3  flex flex-col justify-center items-center gap-10 text-white ">
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
          <User />
          {navStates.profile && (
            <Transition
              variant={variant}
              className={
                !navStates.profile
                  ? "text-white font-mono font-bold absolute ml-10"
                  : "text-white font-mono font-bold absolute ml-9 bg-gray-700 py-2 px-4 rounded-r-full"
              }
            >
              Profile
            </Transition>
          )}
        </Link>{" "}
        <Link
          href={`/v1/profile/${userId}/dashboard`}
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
          <Dashboard />
          {navStates.dashboard && (
            <Transition
              variant={variant}
              className={
                !navStates.dashboard
                  ? "text-white font-mono font-bold absolute ml-10"
                  : "text-white font-mono font-bold absolute ml-9 bg-gray-700 py-2 px-4 rounded-r-full"
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
          <PostAdd />{" "}
          {navStates.posts && (
            <Transition
              variant={variant}
              className={
                !navStates.posts
                  ? "text-white font-mono font-bold absolute ml-10"
                  : "text-white font-mono font-bold absolute ml-9 bg-gray-700 py-2 px-4 rounded-r-full"
              }
            >
              Posts
            </Transition>
          )}
        </Link>{" "}
        <Link
          href={`/v1/profile/${userId}/gigs`}
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
          <Music />{" "}
          {navStates.gigs && (
            <Transition
              variant={variant}
              className={
                !navStates.gigs
                  ? "text-white font-mono font-bold absolute ml-10"
                  : "text-white font-mono font-bold absolute ml-9 bg-gray-700 py-2 px-4 rounded-r-full"
              }
            >
              Gigs
            </Transition>
          )}
        </Link>{" "}
        <Link
          href={`/v1/profile/${userId}/gigs`}
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
          <Settings />{" "}
          {navStates.settings && (
            <Transition
              variant={variant}
              className={
                !navStates.settings
                  ? "text-white font-mono font-bold absolute ml-10"
                  : "text-white font-mono font-bold absolute ml-9 bg-gray-700 py-2 px-4 rounded-r-full"
              }
            >
              Settings
            </Transition>
          )}
        </Link>{" "}
        <Link
          href={`/sign-out`}
          className="flex items-center"
          onMouseOver={() =>
            setNavStates((prev) => {
              return { ...prev, logout: true };
            })
          }
          onMouseOut={() =>
            setNavStates((prev) => {
              return { ...prev, logout: false };
            })
          }
        >
          <Logout />{" "}
          {navStates.logout && (
            <Transition
              variant={variant}
              className={
                !navStates.logout
                  ? "text-white font-mono font-bold absolute ml-10"
                  : "text-white font-mono font-bold absolute ml-9 bg-gray-700 py-2 px-4 rounded-r-full"
              }
            >
              Logout
            </Transition>
          )}
        </Link>
      </aside>
    </div>
  );
};

export default MediumProfileNav;
