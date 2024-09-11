"use client";
import MediumProfileNav from "@/components/MediumProfileNav";
import MobileProfileNav from "@/components/mobile/MobileProfileNav";
import Nav from "@/components/Nav";
import ProfileNav from "@/components/ProfileNav";
import Transition from "@/components/Transition";
import Footer from "@/components/Footer";
import { auth, useAuth, useUser } from "@clerk/nextjs";
import { Box, CircularProgress } from "@mui/material";
import { Toaster } from "sonner";
import React, { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const MainLayout = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const { isLoaded, userId } = useAuth();
  const { userdata, setUser } = useState();
  const { loading, user: allmydata } = useCurrentUser(userId);
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
  let className = "rounded-xl m-3 p-3 w-full lg:-ml-[260px] lg:-mr-[120px] ";

  if (!isLoaded || !userId) {
    return (
      <div className="h-screen w-full ">
        <div className="flex justify-center items-center h-screen flex-col">
          <CircularProgress size="100px" />
          <span className="mt-2 text-2xl font-bold">
            Please wait a moment :)..
          </span>
        </div>
      </div>
    );
  }
  return (
    <Box className="flex bg-black w-[100vw] h-full justify-center items-center ">
      <ProfileNav user={allmydata} loading={loading} />
      <MediumProfileNav />
      <Toaster expand={false} richColors position="top" />
      <div className="flex flex-col  items-center md:w-full xl:w-full">
        <Transition variant={variant} className={className}>
          {children}
        </Transition>
        <MobileProfileNav />
      </div>
    </Box>
  );
};

export default MainLayout;
