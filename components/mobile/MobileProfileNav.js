"use client";
import { UserButton, useAuth } from "@clerk/nextjs";

import {
  Home,
  LayoutDashboard,
  LogOut,
  Music,
  Podcast,
  Settings,
  User,
} from "lucide-react";
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
          <Home size="15px" />
        </Link>
        <Link href={`/v1/profile/${userId}/user`}>
          <User size="15px" />
        </Link>{" "}
        <Link href={`/v1/profile/${userId}/dashboard`}>
          <LayoutDashboard size="15px" />
        </Link>{" "}
        <Link
          href={`/v1/profile/${userId}/posts`}
          className="flex items-center"
        >
          <Podcast size="15px" />
        </Link>{" "}
        <Link href={`/v1/profile/${userId}/gigs`}>
          <Music size="15px" />
        </Link>{" "}
        <Link href={`/v1/profile/${userId}/gigs`}>
          <Settings size="15px" />
        </Link>
        <Link href={`/sign-out`}>
          <LogOut size="15px" />
        </Link>
      </section>
    </div>
  );
};

export default MobileProfileNav;
