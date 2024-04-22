import MediumProfileNav from "@/components/MediumProfileNav";
import Nav from "@/components/Nav";
import ProfileNav from "@/components/ProfileNav";
import Transition from "@/components/Transition";
import { auth } from "@clerk/nextjs";
import React from "react";

const MainLayout = ({ children }) => {
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
  let className = "rounded-xl m-3 p-3 w-full ";
  return (
    <div className="flex bg-black w-100 h-screen">
      <ProfileNav />
      <MediumProfileNav />
      <Transition variant={variant} className={className}>
        {children}
      </Transition>
    </div>
  );
};

export default MainLayout;
