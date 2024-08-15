import Link from "next/link";
import React from "react";

const Logo = ({ flex }) => {
  return (
    <Link href="/gigme/social" className={` flex  hover:cursor-pointer`}>
      <span className=" text-purple-700 font-bold p-2 rounded-b-xl title text-[25px]  md:text-[14px]">
        G
      </span>
      <span className=" text-blue-700  rounded-r-xl  font-bold p-2 link   md:text-[14px]">
        Up
      </span>
    </Link>
  );
};

export default Logo;
