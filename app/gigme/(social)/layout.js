"use client";
import SocialNav from "@/components/GigmeNav";
import MyNav from "@/components/MyNav";
import LeftBar from "@/components/socials/LeftBar";
import RightBar from "@/components/socials/RightBar";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from "flowbite-react";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
const GigmeLayout = ({ children }) => {
  const { user, isSignedIn } = useUser();

  const { isLoaded, userId, sessionId, getToken } = useAuth();
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
      return data;
    } else {
      return data;
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      console.log("No user data to send to backend");
    }

    registerUser();
  });
  const [shownav, setShowNav] = useState();
  return (
    <>
      {isSignedIn ? (
        <div className="flex flex-col gap-2">
          <SocialNav setShowNav={setShowNav} />
          <div className="flex ">
            <LeftBar />
            {children}
            <RightBar />
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-bold">Please check your internet connection</h1>
          <Button color="success" onClick={() => router.push("/")} />
        </div>
      )}
    </>
  );
};

export default GigmeLayout;
