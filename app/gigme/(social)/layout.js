"use client";
import ClientOnly from "@/app/ClientOnly";
import SocialNav from "@/components/GigmeNav";
import MyNav from "@/components/MyNav";
import LeftBar from "@/components/socials/LeftBar";
import RightBar from "@/components/socials/RightBar";
import { useAuth, useUser } from "@clerk/nextjs";
import { CircularProgress } from "@mui/material";
import { Button } from "flowbite-react";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Toaster } from "sonner";
const GigmeLayout = ({ children, modal, chat }) => {
  const { user } = useUser();
  const { isLoaded, userId } = useAuth();
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
  if (!isLoaded || !userId) {
    return (
      <div className="h-screen w-full">
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
    <ClientOnly>
      <div className="flex flex-col gap-2">
        <Toaster expand={false} richColors position="top" />
        <SocialNav />
        <div className="flex">
          <LeftBar />
          {chat}
          {modal}
          {children}
          <RightBar />
        </div>
      </div>
    </ClientOnly>
  );
};

export default GigmeLayout;
