import UsersButton from "./UsersButton";
import { UserButton, auth, useAuth } from "@clerk/nextjs";

import { Badge, CircularProgress } from "@mui/material";
// import { useGlobalContext } from "@/app/Context/store";

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

const Nav = async () => {
  const { userId } = auth();
  return (
    <nav className="container shadow-cyan-700 bg-black p-4 shadow-md sticky top-0 mx-auto max-w-[100vw] xl:w-[100vw]  flex items-center-center justify-between">
      <Logo />
      <span className="flex items-center">
        {userId ? (
          <div className="flex flex-grow gap-5 items-center">
            <Link
              href="/gigme/social"
              className="ml-4 text-white  link md:text-[16px] md:font-mono flex flex-col gap-2 items-center md:hover:bg-gray-200 md:hover:text-neutral-800 md:hover:scale-100 md:p-2 rounded-full  transition-all duration-75"
            >
              <span>
                Gigme <span className="hidden ml-2 md:inline-flex">|</span>
              </span>
              <Music size="20px" className="md:hidden" />
            </Link>

            <Link
              href="/gigme/about"
              className="mr-9 text-white  link md:text-[16px] md:font-mono flex flex-col gap-2 items-center md:hover:bg-gray-200 md:hover:text-neutral-800 md:hover:scale-100 p-2 rounded-full  transition-all duration-75"
            >
              <span>
                {" "}
                About<span className="hidden ml-2 md:inline-flex">|</span>
              </span>
              <Info size="20px" className="md:hidden" />
            </Link>
            <Link
              href={`/v1/profile/${userId}`}
              className="-ml-12 mr-4 text-white  link md:text-[16px] md:font-mono flex flex-col gap-2 items-center md:hover:bg-gray-200 md:hover:text-neutral-800 md:hover:scale-100 p-2 rounded-full  transition-all duration-75"
            >
              <span>
                Profile <span className="hidden ml-2 md:inline-flex">|</span>
              </span>
              <User size="20px" className="md:hidden" />
            </Link>
            <Link
              href="/gigme/about"
              className="-ml-6 text-white  link md:text-[16px] md:font-mono flex flex-col gap-2 items-center md:hover:bg-gray-200 md:hover:text-neutral-800 md:hover:scale-100 p-2 rounded-full  transition-all duration-75"
            >
              Faq
              <MessageCircleQuestion size="20px" className="md:hidden" />
            </Link>
            {/* <AvatarComponent afterSignOutUrl="/" /> */}
            <UserButton afterSignOutUrl="/" />
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
      </span>
    </nav>
  );
};

export default Nav;
