import Link from "next/link";
import React from "react";

const Logo = ({ flex }) => {
  return (
    <Link
      href="/gigme/social"
      className={` tracking-tighter hover:cursor-pointer`}
    >
      <span className=" bg-pink-500/60 text-yellow-200 font-bold p-2 rounded-b-xl title text-pretty md:text-[14px]">
        GigMe
      </span>
      <span className=" text-green-300 bg-white rounded-r-xl  font-bold p-2 link  shadow-blue-500 shadow-xl md:text-[14px]">
        Up
      </span>
    </Link>
  );
};

export default Logo;
