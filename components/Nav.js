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

const Nav = async () => {
  const { userId } = auth();
  return (
    <div className="bg-gray-300 shadow-lg top-0">
      <nav className="container mx-auto max-w-[100vw] xl:w-[60vw] p-3 bg-cyan-800 flex items-center justify-between">
        <Logo />
        <span className="flex items-center">
          {userId ? (
            <div className="flex flex-grow gap-5 items-center">
              <Link href="/gigme/social" className="text-white">
                <IoHome size="20px" />
              </Link>
              <Link href="/gigme/chat" className="text-white">
                <Badge badgeContent={4} color="warning">
                  <AiFillMessage size="20px" />
                </Badge>
              </Link>
              <div>
                <Link href="/gigme/notify" className="text-white">
                  <Badge badgeContent={4} color="warning">
                    {" "}
                    <FaBell size="20px" />
                  </Badge>
                </Link>
              </div>
              <Link href="/gigme/search" className="text-white">
                <IoSearch size="20px" />
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex gap-4">
              {" "}
              <UsersButton
                link="/sign-in"
                title="SignIn"
                className="text-white font-arial bg-slate-800 py-[6px] hover:bg-slate-600  px-3 w-[80px] border border-yellow-500  rounded-xl "
              />{" "}
              <UsersButton
                link="/sign-up"
                title="SignUp"
                className="text-white font-arial bg-white-800 py-[6px] hover:bg-slate-600  px-3 w-[80px] border border-yellow-500  rounded-xl "
              />{" "}
            </div>
          )}{" "}
        </span>
      </nav>{" "}
    </div>
  );
};

export default Nav;
