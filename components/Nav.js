"use client";
import UsersButton from "./UsersButton";
import { UserButton, auth, useAuth } from "@clerk/nextjs";

import { Badge, CircularProgress } from "@mui/material";
// import { useGlobalContext } from "@/app/Context/store";
import { BiSolidVideos } from "react-icons/bi";
import Link from "next/link";
import Logo from "./Logo";
import {
  Info,
  MedalIcon,
  MessageCircleQuestion,
  Music,
  User,
} from "lucide-react";
import AvatarComponent from "./Avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Nav = () => {
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  return (
    <nav className="container shadow-cyan-700 dark:bg-black bg-neutral-500 p-4 shadow-md sticky top-0 mx-auto max-w-[100vw] xl:w-[100vw]  flex items-center justify-between">
      <Logo />
      <div className="flex items-center">
        {userId ? (
          <div className="flex flex-grow gap-4 items-center ml-4">
            <Link
              href="/gigme/social"
              className=" text-white  link md:text-[16px] md:font-mono flex flex-col gap-2 items-center md:hover:bg-gray-200 md:hover:text-neutral-800 md:hover:scale-100 md:p-2 rounded-full  transition-all duration-75"
            >
              <span className="hidden ml-2 md:inline-flex">
                Gigme <span className="hidden ml-2 md:inline-flex">|</span>
              </span>
              <BiSolidVideos size="20px" className="md:hidden" />
            </Link>

            <Link
              href={`/v1/profile/${userId}`}
              className=" text-white  link md:text-[16px] md:font-mono flex flex-col gap-2 items-center md:hover:bg-gray-200 md:hover:text-neutral-800 md:hover:scale-100 p-2 rounded-full  transition-all duration-75"
            >
              <span className="hidden ml-2 md:inline-flex">
                Profile <span className="hidden ml-2 md:inline-flex">|</span>
              </span>
              <User size="20px" className="md:hidden" />
            </Link>
            <Link
              href="/gigme/about"
              className=" text-white  link md:text-[16px] md:font-mono flex flex-col gap-2 items-center md:hover:bg-gray-200 md:hover:text-neutral-800 md:hover:scale-100 p-2 rounded-full  transition-all duration-75"
            >
              <span className="hidden ml-2 md:inline-flex">
                {" "}
                About<span className="hidden ml-2 md:inline-flex">|</span>
              </span>
              <Info size="20px" className="md:hidden" />
            </Link>
            <Link
              href="/gigme/about"
              className=" text-white  link md:text-[16px] md:font-mono flex flex-col gap-2 items-center md:hover:bg-gray-200 md:hover:text-neutral-800 md:hover:scale-100 p-2 rounded-full  transition-all duration-75"
            >
              {" "}
              <span className="hidden ml-2 md:inline-flex">Faq</span>
              <MessageCircleQuestion size="20px" className="md:hidden" />
            </Link>
            <AvatarComponent
              usercomm={user?.user}
              posts="w-[32px] h-[32px] rounded-full object-fit"
            />
            {/* <UserButton afterSignOutUrl="/" /> */}
          </div>
        ) : (
          <div className="flex gap-4">
            {" "}
            <UsersButton
              link="/sign-in"
              title="SignIn"
              className=" title mr-6 text-slate-800  bg-neutral-200 py-[3px] md:py-[6px] px-3 w-[80px] border border-yellow-500  rounded-xl md:hover:bg-purple-200 md:hover:text-slate-600 "
            />{" "}
            {/* <UsersButton
              link="/sign-up"
              title="SignUp"
              className="hidden title mr-6 text-slate-800  bg-neutral-200 py-[3px] md:py-[6px] md:hover:bg-slate-600  px-3 w-[80px] border border-yellow-500  rounded-xl "
            />{" "} */}
          </div>
        )}{" "}
      </div>
    </nav>
  );
};

export default Nav;
