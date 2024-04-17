import Link from "next/link";
import React from "react";
import Logo from "../Logo";
import { TextInput } from "flowbite-react";
import { Search } from "lucide-react";
import { Box } from "@mui/material";
import MobileSheet from "./MobileSheet";

const MobileNav = () => {
  return (
    <div className="flex p-3 bg-gray-300 shadow-lg  items-center justify-between gap-2 md:hidden">
      <Box className="flex items-center justify-center gap-3">
        <Logo />
      </Box>{" "}
      <div>
        <MobileSheet />
      </div>
    </div>
  );
};

export default MobileNav;
