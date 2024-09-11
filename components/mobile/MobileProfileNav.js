"use client";
import { UserButton, useAuth } from "@clerk/nextjs";

import {
  Home,
  LayoutDashboard,
  LogOut,
  Music,
  Podcast,
  Search,
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
      className={` md:hidden xl:hidden w-[100%] mx-auto h-[50px] sticky  p-6 mb-2 flex  justify-center items-center self-center `}
    >
      <section className="bg-gray-700/50 p-2    flex  justify-around items-center gap-4 text-white w-full">
        <Link className="mx-4 " href={`/gigme/social`}>
          <Home size="19px" />
        </Link>{" "}
        <Link className="mx-4 " href={`/v1/profile/${userId}/user`}>
          <User size="19px" />
        </Link>{" "}
        <Link className="mx-4 " href={`/v1/profile/${userId}`}>
          <LayoutDashboard size="19px" />
        </Link>{" "}
        <Link href={`/gigme/gigs/${userId}`} className="mx-4">
          <Music size="17px" />
        </Link>{" "}
        <Link href={`/gigme/search`} className="mx-4">
          <Search size="20px" />
        </Link>
        <Link className="mx-4 " href={`/gigme/gigs/${userId}`}>
          <Settings size="19px" />
        </Link>
      </section>
    </div>
  );
};

export default MobileProfileNav;
