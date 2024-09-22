import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../public/assets/png/logo-white.png";
const Logo = ({ flex }) => {
  return (
    <Link href="/gigme/social" className={` flex  hover:cursor-pointer`}>
      <Image
        src={logo}
        width={100}
        height={50}
        alt="logo"
        className="w-[100px] h-[60px] hidden md:flex"
      />
      <div className="w-[60px] h-[30px] px-4 py-1 bg-gray-400 md:hidden rounded-ee-xl rounded-tr-lg">
        <span className=" text-purple-700 font-bold font-mono  rounded-b-xl  text-[18px]  md:text-[14px]">
          G
        </span>
      </div>
    </Link>
  );
};

export default Logo;
