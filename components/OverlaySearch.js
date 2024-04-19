import { Avatar } from "@mui/material";
import React from "react";
import Transition from "./Transition";

const OverlaySearch = () => {
  let variant = {
    initial: {
      y: ["-1000px", "-500px", "-400px", "-200px", "0px", ""],
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
  return (
    <Transition variant={variant} className="absolute bg-green-500">
      <div className="md:flex md:z-50  md:bg-black md:h-screen md:w-screen  ">
        <div
          onClick={() => router.push(`/users/friends/${searchquery}`)}
          className="absolute bg-gray-600/60  m-[40px] font-mono text-neutral-300/60 w-[300px] md:w-[700px] rounded-xl p-2 cursor-pointer hover:bg-gray-500/80 transition ease-in-out delay-150 hover:-translate-x-2 hover:scale-20  duration-300"
        >
          <div className="flex gap-4 items-center ">
            {" "}
            <Avatar className="rounded-full" />
            <div>
              <div className="flex flex-col gap-2 text-red-200">
                Zacharia Muigai
              </div>
              <div className="text-purple-100">zachyb92@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default OverlaySearch;
