import UsersButton from "./UsersButton";
import { UserButton, auth, useAuth } from "@clerk/nextjs";

import { Badge, CircularProgress } from "@mui/material";
// import { useGlobalContext } from "@/app/Context/store";

import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./mobile/MobileNav";
import MobileSheet from "./mobile/MobileSheet";

import { AiFillMessage } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { Chat, Pages, QuestionAnswer } from "@mui/icons-material";
import {
  Info,
  MailQuestion,
  MedalIcon,
  MessageCircleQuestion,
  User,
} from "lucide-react";

const Nav = async () => {
  const { userId } = auth();
  return (
    <div className="bg-gray-300 shadow-lg top-0">
      <nav className="container mx-auto max-w-[100vw] xl:w-[60vw] p-3 bg-cyan-800 flex items-center justify-between">
        <Logo />
        <span className="flex items-center">
          {userId ? (
            <div className="flex flex-grow gap-5 items-center">
              <Link
                href="/gigme/social"
                className="ml-4 text-white flex flex-col gap-2 items hover:bg-gray-200 hover:text-neutral-800 hover:scale-100 md:p-2 rounded-full  transition-all duration-75"
              >
                <span>
                  Gigme <span className="hidden ml-2 md:inline-flex">|</span>
                </span>
                <MedalIcon size="20px" className="md:hidden" />
              </Link>

              <Link
                href="/gigme/about"
                className="mr-9 text-white flex flex-col gap-2 items hover:bg-gray-200 hover:text-neutral-800 hover:scale-100 p-2 rounded-full  transition-all duration-75"
              >
                <span>
                  {" "}
                  About<span className="hidden ml-2 md:inline-flex">|</span>
                </span>
                <Info size="20px" className="md:hidden" />
              </Link>
              <Link
                href={`/v1/profile/${userId}`}
                className="-ml-12 mr-4 text-white flex flex-col gap-2 items hover:bg-gray-200 hover:text-neutral-800 hover:scale-100 p-2 rounded-full  transition-all duration-75"
              >
                <span>
                  Profile <span className="hidden ml-2 md:inline-flex">|</span>
                </span>
                <User size="20px" className="md:hidden" />
              </Link>
              <Link
                href="/gigme/about"
                className="-ml-6 text-white flex flex-col gap-2 items hover:bg-gray-200 hover:text-neutral-800 hover:scale-100 p-2 rounded-full  transition-all duration-75"
              >
                Faq
                <MessageCircleQuestion size="20px" className="md:hidden" />
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex gap-4">
              {" "}
              <UsersButton
                link="/sign-in"
                title="SignIn"
                className="mr-6 text-white font-arial bg-slate-800 py-[6px] hover:bg-slate-600  px-3 w-[80px] border border-yellow-500  rounded-xl "
              />{" "}
              <UsersButton
                link="/sign-up"
                title="SignUp"
                className="mr-6 text-white font-arial bg-white-800 py-[6px] hover:bg-slate-600  px-3 w-[80px] border border-yellow-500  rounded-xl "
              />{" "}
            </div>
          )}{" "}
        </span>
      </nav>{" "}
    </div>
  );
};

export default Nav;
