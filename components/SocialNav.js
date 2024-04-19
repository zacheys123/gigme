"use client";
import React from "react";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./mobile/MobileNav";
import { TextInput } from "flowbite-react";
import { Search } from "lucide-react";
import UsersButton from "./UsersButton";
import { useRouter } from "next/navigation";
const SocialNav = () => {
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const { isSignedIn, user } = useUser();

  return (
    <div className="bg-gray-300 shadow-lg   top-0 ">
      <nav className="hidden md:flex container mx-auto max-w-[90vw] xl:w-[60vw] py-[7px]  px-3  items-center justify-between">
        <div>
          <Logo />
        </div>
        <div>
          <form>
            <div className="flex items-center justify-center gap-1">
              {" "}
              <TextInput
                type="text"
                placeholder="Find anyone/username/instrument..."
              />
              <Search className=" text-neutral-400 cursor-pointer" />
            </div>
          </form>
        </div>{" "}
        <div className="flex gap-2 items-center justify-evenly">
          <Link
            className="font-bold  font-mono text-base text-neutral-600  hover:bg-gray-300/80 p-2 transition-opacity hover:opacity-25 duration-175 ease-out"
            href="/gigme/dashboard"
          >
            Dashboard |
          </Link>
          <Link
            className="font-bold  font-mono text-base text-neutral-600  hover:bg-gray-300/80 p-2 transition-opacity hover:opacity-25 duration-175 ease-out"
            href="/gigme/gigs/1234567id"
          >
            Gigs |
          </Link>
          <Link
            className="font-bold  font-mono text-base text-neutral-600  hover:bg-gray-300/80 p-2 transition-opacity hover:opacity-25 duration-175 ease-out"
            href="/gigme/chat"
          >
            Chat |
          </Link>
          <Link
            className="font-bold  font-mono text-base text-neutral-600  hover:bg-gray-300/80 p-2 transition-opacity hover:opacity-25 duration-175 ease-out"
            href="/gigme/profile/vvbvvb12345id"
          >
            Profile |
          </Link>
          <UsersButton
            title="Contact"
            className="font-mono rounded-xl border-2 px-3 py-1 bg-yellow-500 text-white hover:bg-yellow-500/50 hover:text-gray-100"
            onClick={() => router.push("/gigme/contact")}
          />
        </div>
        <UserButton afterSignOutUrl="/" />
      </nav>
      <MobileNav />
    </div>
  );
};

export default SocialNav;
