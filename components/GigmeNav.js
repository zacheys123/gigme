"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./mobile/MobileNav";
import { TextInput } from "flowbite-react";
import { Search } from "lucide-react";
import UsersButton from "./UsersButton";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/Context/store";
import { Avatar } from "@mui/material";
import { global } from "@/actions";
import OverlaySearch from "./OverlaySearch";
import AvatarComponent from "./Avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
const SocialNav = () => {
  const {
    userState: { toggle },
    setUserState,
  } = useGlobalContext();
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useCurrentUser(userId);
  const pathname = usePathname();
  const [searchquery, setSearchQuery] = useState("");
  const SearchUser = (ev) => {
    if (ev.target.value.length > 0) {
      setUserState({ type: global.TOGGLESEARCH });
    } else {
      setUserState({ type: global.UNTOGGLESEARCH });
    }
  };

  const [data, setData] = useState([]);
  const getAllUsers = async () => {
    const res = await fetch(`/api/user/getAllusers/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const currentuser = await res.json();
    console.log(currentuser?.currentuser);
    setData(currentuser?.currentuser);
    return currentuser?.currentuser;
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const searchFn = () => {
    let sortedData = data;
    if (searchquery) {
      sortedData = sortedData?.filter((user) => {
        if (
          user?.firstname?.toLowerCase().includes(searchquery) ||
          user?.lastname?.toLowerCase().includes(searchquery) ||
          user?.username?.toLowerCase().includes(searchquery)
        ) {
          return sortedData;
        }
      });
    }
    return sortedData;
  };

  const inactiveLink =
    "font-bold  font-mono text-base text-neutral-600    hover:opacity-55 transition-transform duration-200 hover:opacity-55 transition-transform duration-200;";
  const activeLink =
    inactiveLink + "text-white bg-neutral-100 rounded-b-xl px-2 py-1";
  return (
    <div className="bg-gray-300 shadow-lg   top-0 ">
      <nav className="hidden lg:flex container mx-auto max-w-[90vw] xl:w-[60vw] py-[7px]  px-3  items-center justify-between">
        <div>
          <Logo />
        </div>
        <div>
          <form className=" hidden md:flex ml-3">
            <div className="flex items-center justify-center gap-1">
              {" "}
              <TextInput
                value={searchquery}
                type="text"
                placeholder="Find anyone/username/instrument..."
                onChange={(ev) => setSearchQuery(ev.target.value)}
                onKeyUp={SearchUser}
                onKeyDown={searchFn}
              />
            </div>
          </form>
        </div>{" "}
        <div className="flex gap-2 items-center justify-evenly">
          <Link
            className={
              pathname === "/gigme/dashboard" ? activeLink : inactiveLink
            }
            href="/gigme/dashboard"
          >
            Dashboard |
          </Link>
          <Link
            className={
              pathname === `/gigme/gigs/${userId}` ? activeLink : inactiveLink
            }
            href={`/gigme/gigs/${userId}`}
          >
            Gigs |
          </Link>
          <Link
            className={pathname === "/gigme/chat" ? activeLink : inactiveLink}
            href="/gigme/chat"
          >
            Chat |
          </Link>
          <Link
            className={
              pathname === `/v1/profile/${userId}` ? activeLink : inactiveLink
            }
            href={`/v1/profile/${userId}`}
          >
            Profile |
          </Link>
          <UsersButton
            title="Contact Us"
            className="font-mono rounded-xl border-2 px-3 py-1  bg-yellow-500 text-white hover:bg-yellow-500/50 hover:text-gray-100"
            onClick={() => router.push("/gigme/contact")}
          />
        </div>
        <div className="-mr-[50px] ml-[20px]">
          {isLoaded && (
            <AvatarComponent
              usercomm={user?.user}
              posts="w-[32px] h-[32px] rounded-full object-fit"
            />
          )}
        </div>
      </nav>
      {toggle && <OverlaySearch searchfunc={searchFn()} />}
      <MobileNav />
      {!pathname === "/search" && (
        <div className="flex md:hidden ml-3 w-100  mt-3 mb-5 ">
          <form className=" ">
            <div className="flex items-center  justify-center gap-1  w-full">
              {" "}
              <TextInput
                value={searchquery}
                className="w-[450px] "
                type="text"
                placeholder="Find anyone/username/instrument..."
                onChange={(ev) => setSearchQuery(ev.target.value)}
                onKeyUp={SearchUser}
              />
              <Search className=" text-neutral-400 cursor-pointer" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SocialNav;
