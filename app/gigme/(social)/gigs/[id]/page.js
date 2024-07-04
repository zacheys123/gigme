import Transition from "@/components/Transition";
import React from "react";

const GigPage = () => {
  const classname = "mt-2";
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
    <div className="container bg-neutral-300 w-full h-screen">
      <div className="flex justify-between">
        {" "}
        <div className="view h-[40px] flex jusif">View Gigs</div>
        <div className="create h-[40px]">Create A Gig</div>
      </div>
      <Transition variant={variant} className={classname}>
        <div className="">Data here</div>
      </Transition>
    </div>
  );
};

export default GigPage;
