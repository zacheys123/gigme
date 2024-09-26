import Image from "next/image";
import Link from "next/link";
import React from "react";

import logo2 from "../public/assets/logo/png/logo-no-background.png";
const Logo = ({ flex }) => {
  return (
    <Link href="/" className={` flex  hover:cursor-pointer`}>
      <Image
        src={logo2}
        width={100}
        height={50}
        alt="logo"
        className="w-[75px] h-[15px]  md:w-[80px] md:h-[20px]  lg:w-[80px] lg:h-[20px] xl:w-[80px] xl:h-[20px]"
      />
    </Link>
  );
};

export default Logo;
