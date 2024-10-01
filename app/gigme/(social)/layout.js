"use client";
import ClientOnly from "@/app/ClientOnly";
import useStore from "@/app/zustand/useStore";
import SocialNav from "@/components/GigmeNav";
import LogoutComponent from "@/components/LogoutComponent";
import UserModal from "@/components/modals/UserModal";
import MyNav from "@/components/MyNav";
import ToolTip from "@/components/postComponents/ToolTip";
import LeftBar from "@/components/socials/LeftBar";
import RightBar from "@/components/socials/RightBar";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth, useUser } from "@clerk/nextjs";
import { CircularProgress } from "@mui/material";
import { Button } from "flowbite-react";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Toaster } from "sonner";
const GigmeLayout = ({ children, modal, chat }) => {
  const { user } = useUser();
  const { isLoggedOut } = useStore();
  const { isLoaded, userId } = useAuth();
  const { user: id } = useCurrentUser(userId);
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

  useEffect(() => {
    // Load the Cloudinary widget library
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const { logout } = useStore();
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
  console.log(logout);
  return (
    <ClientOnly>
      <div className="absolute z-[50]">
        <UserModal open={logout} />
      </div>

      <div className="flex flex-col gap-2 relative">
        <Toaster expand={false} richColors position="top" />
        <SocialNav /> <ToolTip id={id} />
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
