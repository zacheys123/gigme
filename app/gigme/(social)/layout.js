"use client";
import SocialNav from "@/components/GigmeNav";
import { useAuth, useUser } from "@clerk/nextjs";
import React, { useCallback } from "react";
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
  return (
    <>
      {isSignedIn ? (
        <div>
          <SocialNav />
          {children}
        </div>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <h1 className="text-bold">Please check your internet connection</h1>
        </div>
      )}
    </>
  );
};

export default GigmeLayout;
