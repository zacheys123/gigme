"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Dashboard, Logout, PostAdd } from "@mui/icons-material";
import { Home, Music, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Transition from "../Transition";

const MobileProfileNav = () => {
  const { userId } = useAuth();
  const [navStates, setNavStates] = useState({
    profile: false,
    dashboard: false,
    posts: false,
    gigs: false,
    settings: false,
    logout: false,
  });
  const [userData, setData] = useState({});
  const handleUpdate = (ev) => {};
  return (
    <div
      className={` md:hidden xl:hidden w-full  flex  justify-center items-center `}
    >
      <section className="bg-gray-700 p-3  flex  justify-center items-center gap-10 text-white ">
        <Link href={`/gigme/social`}>
          <Home />
        </Link>
        <Link
          href={`/v1/profile/${userId}/user`}
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
        </Link>{" "}
        <Link
          href={`/v1/profile/${userId}/dashboard`}
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
          <PostAdd />
        </Link>{" "}
        <Link
          href={`/v1/profile/${userId}/gigs`}
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
          <Music />
        </Link>{" "}
        <Link
          href={`/v1/profile/${userId}/gigs`}
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
          <Settings />
        </Link>
        <Link
          href={`/sign-out`}
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
          <Logout />
        </Link>
      </section>
    </div>
  );
};

export default MobileProfileNav;
