import Link from "next/link";
import React from "react";

const Logo = ({ flex }) => {
  return (
    <Link href="/" className={`md:${flex} tracking-tighter cursor-pointer`}>
      <span className=" bg-pink-500/50 text-yellow-200 font-bold p-1 rounded-b-xl shadow-red-500">
        GigMe
      </span>
      <span className=" text-green-300 bg-white rounded-r-xl  font-bold p-1 shadow-blue-500">
        Up
      </span>
    </Link>
  );
};

export default Logo;
