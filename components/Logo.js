import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="tracking-tighter cursor-pointer">
      <span className=" bg-pink-600 text-yellow-200 font-bold p-1 rounded-b-xl shadow-red-500">
        GigMe
      </span>
      <span className=" text-green-300 bg-white rounded-r-xl  font-bold p-1 shadow-blue-500">
        Up
      </span>
    </Link>
  );
};

export default Logo;
