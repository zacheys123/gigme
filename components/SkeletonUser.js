"use client";
import React from "react";
import { Box } from "@mui/material";
import { Footer } from "flowbite-react";
import Link from "next/link";

const SkeletonUser = () => {
  return (
    <div className="overflow-auto h-[calc(100vh-20px)] bg-gray-700/70 w-full">
      <div className="bg-gray-300 shadow-lg top-0 sticky">
        <nav className="container mx-auto max-w-[100vw] xl:w-[60vw] shadow-lg p-3 bg-gray-500 flex items-center justify-between">
          <Link
            href="/gigme/social"
            className={` tracking-tighter hover:cursor-pointer`}
          >
            <span className=" bg-pink-500/50 text-yellow-200 font-bold p-1 rounded-b-xl shadow-red-500"></span>
            <span className=" text-green-300 bg-white rounded-r-xl  font-bold p-1 shadow-blue-500"></span>
          </Link>
          <span className="flex items-center">
            <div className="flex flex-grow gap-5 items-center">
              <Link href="/gigme/social" className="text-white">
                <div className="bg-gray-200 w-[20px] rounded-full"></div>
              </Link>
              <Link href="/gigme/chat" className="text-white">
                <div className="bg-gray-200 w-[20px] rounded-full"></div>
              </Link>
              <div>
                <Link href="/gigme/notify" className="text-white">
                  <div className="bg-gray-200 w-[20px] rounded-full"></div>
                </Link>
              </div>
              <Link href="/gigme/search" className="text-white">
                <div className="bg-gray-200 w-[20px] rounded-full"></div>
              </Link>
              <div className="bg-gray-200 w-[20px] rounded-full"></div>
            </div>
          </span>
        </nav>{" "}
      </div>
      <div className="h-[calc(100vh-20px)]">
        <Box className="flex items-center   justify-around md:justify-self-auto shadow-md bg-inherit h-[200px] w-full md:h-[400px]">
          <Box className="flex gap-2 items-center h-full">
            <div className=" flex justify-center mr-[40px] mt-7 items-center bg-gray-400/20 rounded-full w-[160px] h-[160px]"></div>
            <div className="flex flex-col">
              <div className="h-[200px] w-[120px] flex flex-col gap-2 mt-[160px] ">
                <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-[170px] z-50  -ml-[40px]"></div>
                <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-[170px] z-50 -ml-[40px]"></div>
              </div>{" "}
              <div className="w-[73px] h-[20px] -mt-[140px] mb-[85px] bg-gray-400/20"></div>
            </div>
          </Box>
          <div className="hidden md:flex md:flex-col ">
            <div className="w-[60px]"></div>
          </div>
        </Box>
        <div className="h-[70px] w-full flex flex-col gap-2 mt-10">
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50  "></div>
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50 "></div>
        </div>{" "}
        <div className="h-[70px] w-full flex flex-col gap-2 ">
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50  "></div>
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50 "></div>
        </div>{" "}
        <div className="h-[70px] w-full flex flex-col gap-2 ">
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50  "></div>
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50 "></div>
        </div>{" "}
        <div className="h-[70px] w-full flex flex-col gap-2 ">
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50  "></div>
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50 "></div>
        </div>{" "}
        <div className="h-[70px] w-full flex flex-col gap-2 ">
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50  "></div>
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50 "></div>
        </div>{" "}
        <div className="h-[70px] w-full flex flex-col gap-2 ">
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50  "></div>
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50 "></div>
        </div>{" "}
        <div className="h-[70px] w-full flex flex-col gap-2 ">
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50  "></div>
          <div className="flex flex-col gap-4 h-[20px] bg-gray-400/20 w-full z-50 "></div>
        </div>{" "}
      </div>
      <Footer container className="hidden md:flex b-0">
        <Footer.Copyright href="/gigme/social" by="GigMeup™" year={2022} />
        <Footer.LinkGroup>
          <Footer.Link href="/gigme/about">About</Footer.Link>
          <Footer.Link href="/gigme/privacy">Privacy Policy</Footer.Link>
          <Footer.Link href="/gigme/licencing">Licensing</Footer.Link>
          <Footer.Link href="/gigme/contact">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
};

export default SkeletonUser;
