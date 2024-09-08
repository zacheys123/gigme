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
      className={` md:hidden xl:hidden w-full h-[50px] sticky  p-2 mb-2 flex  justify-center items-center self-center mr-5`}
    >
      <section className="bg-gray-700/50 p-3  flex  justify-center items-center gap-8 text-white w-full">
        <Link className="mx-4 " href={`/v1/gigme/social`}>
          <Home size="21px" />
        </Link>{" "}
        <Link className="mx-4 " href={`/v1/profile/${userId}/user`}>
          <User size="21px" />
        </Link>{" "}
        <Link className="mx-4 " href={`/v1/profile/${userId}/dashboard`}>
          <LayoutDashboard size="21px" />
        </Link>{" "}
        <Link className="mx-4 " href={`/v1/profile/${userId}/gigs`}>
          <Settings size="21px" />
        </Link>
      </section>
    </div>
  );
};

export default MobileProfileNav;
