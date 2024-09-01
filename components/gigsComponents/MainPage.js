"use client";
import React, { useState } from "react";
import Transition from "../Transition";
import { ArrowDownCircle, ArrowUpCircle, Info } from "lucide-react";
import { Box, Divider } from "@mui/material";
import GigInfo from "./GigInfo";
import ViewGigs from "./ViewGigs";
import ClientOnly from "@/app/ClientOnly";

const MainPage = ({ user }) => {
  const [view, setView] = useState();
  const [create, setCreate] = useState();
  const classname =
    "mt-2 w-[90%] mx-auto  p-3 shadow-lg  h-[calc(100vh-70px)] ";
  let variant = {
    initial: {
      y: ["1500px", "1000px", "600px", "400px", "200px", "0px", ""],
      opacity: [-10, -7, 0],
    },
    animate: {
      y: 0,
      opacity: [-10, -7, -5, -3, 1],
    },
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  };
  const custClass =
    "h-[40px]  shadow-slate-600 shadow-xl  bg-neutral-300 flex justify-center items-center gap-2 min-w-[120px] whitespace-nowrap";
  return (
    <ClientOnly>
      <div className="flex w-screen shadow-xl  overflow-hidden min-h-screen  lg:hidden gigspage flex-col ">
        <h6 className="font-mono underline text-center mt-2 text-white">
          Choose Gig Actions
        </h6>
        <Divider />
        <Box className="flex justify-center items-center mt-3 shadow-xl shadow-cyan-700 h-[100px] w-[90%] mx-auto">
          {" "}
          <div
            className={`${view} ? view   ${custClass} : ${custClass} `}
            onClick={() => {
              setView((prev) => !prev);
              setCreate(false);
            }}
          >
            <h6>View Gigs</h6>
            {view ? (
              <ArrowDownCircle size="15px" />
            ) : (
              <ArrowUpCircle size="15px" />
            )}
          </div>
          <div
            className={`${create} ? create  ${custClass} : ${custClass} `}
            onClick={() => {
              setView(false);
              setCreate((prev) => !prev);
            }}
          >
            <h6>Create A Gig</h6>
            {create ? (
              <ArrowDownCircle size="15px" />
            ) : (
              <ArrowUpCircle size="15px" />
            )}
          </div>
        </Box>
        {!view && !create && (
          <div className="h-[calc(100vh-180px)] w-[90%] flex  justify-center items-center">
            <div className="flex flex-col items-center gap-3 -mt-6">
              {" "}
              {/* <div className="w-full flex justify-center items-center"></div> */}
              <Info size="30px" color="white" />{" "}
              <h6 className="font-mono text-neutral-300">
                {" "}
                More Info will displayed here
              </h6>
            </div>
          </div>
        )}
        {view && (
          <Transition variant={variant} className={classname}>
            <ViewGigs user={user} />
          </Transition>
        )}
        {create && (
          <Transition variant={variant} className={classname}>
            <GigInfo user={user} />
          </Transition>
        )}
      </div>
    </ClientOnly>
  );
};

export default MainPage;
