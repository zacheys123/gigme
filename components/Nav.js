import UsersButton from "./UsersButton";
import { UserButton, auth, useAuth } from "@clerk/nextjs";

import { CircularProgress } from "@mui/material";
// import { useGlobalContext } from "@/app/Context/store";

import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./mobile/MobileNav";
import MobileSheet from "./mobile/MobileSheet";
const Nav = async () => {
  const { userId } = auth();
  return (
    <div className="bg-gray-300 shadow-lg top-0">
      <nav className="container mx-auto max-w-[100vw] xl:w-[60vw] p-3 bg-cyan-800 flex items-center justify-between">
        <Logo />
        <span className="hidden md:flex">
          {userId ? (
            <UserButton afterSignOutUrl="/" />
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
