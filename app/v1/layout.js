"use client";
import MediumProfileNav from "@/components/MediumProfileNav";
import MobileProfileNav from "@/components/mobile/MobileProfileNav";
import Nav from "@/components/Nav";
import ProfileNav from "@/components/ProfileNav";
import Transition from "@/components/Transition";
import Footer from "@/components/Footer";
import { auth, useUser } from "@clerk/nextjs";
import { Box } from "@mui/material";

import React, { useCallback, useEffect } from "react";

const MainLayout = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const registerUser = useCallback(async () => {
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log(data);
    window?.localStorage.setItem("user", JSON.stringify(data?.results));
    if (data?.userstatus === false) {
      window?.localStorage.setItem("user", JSON.stringify(data?.results));
      return data;
    } else {
      window?.localStorage.setItem("user", JSON.stringify(data?.results));
      return data;
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      console.log("No user data to send to backend");
    }

    registerUser();
  });
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
    <Box className="flex bg-black w-[100vw] min-h-[100vh]">
      <ProfileNav />
      <MediumProfileNav />

      <div className="flex flex-col  items-center md:w-full xl:w-full">
        <Transition variant={variant} className={className}>
          {children}
        </Transition>
        <MobileProfileNav />
        <Footer />
      </div>
    </Box>
  );
};

export default MainLayout;
