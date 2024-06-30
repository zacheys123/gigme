import Link from "next/link";
import React from "react";
import Logo from "../Logo";
import { TextInput } from "flowbite-react";
import { Search } from "lucide-react";
import { Box } from "@mui/material";
import MobileSheet from "./MobileSheet";
import { useUser } from "@clerk/nextjs";

const MobileNav = () => {
  const { user } = useUser();
  return (
    <div className="flex p-3 bg-gray-300 shadow-lg  items-center justify-between gap-2 lg:hidden">
      <Box className="flex items-center justify-center gap-3">
        <Logo />
      </Box>{" "}
      <div>
        <span className="font-bold text-[12px] text-gray-600/50 ">
          Logged User:{" "}
        </span>
        <span className="font-bold text-[13px] text-neutral-600/40 font-mono">
          {user?.emailAddresses[0]?.emailAddress}
        </span>
      </div>
      <div>
        <MobileSheet />
      </div>
    </div>
  );
};

export default MobileNav;
