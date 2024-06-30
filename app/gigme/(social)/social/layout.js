"use client";
import SocialNav from "@/components/GigmeNav";
import LeftBar from "@/components/socials/LeftBar";
import RightBar from "@/components/socials/RightBar";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useEffect } from "react";
const SocialLayout = ({ children }) => {
  const router = useRouter();
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
      return router.push("/gigme/social");
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) {
      console.log("No user data to send to backend");
    }
    registerUser();
  }, [user, registerUser]);
  if (!isLoaded) {
    return (
      <div className="flex h-[100vh] flex-col items-center justify-center">
        <h3 className="text-red-600 font-bold font-mono">
          Waiting for user info to load :)...
        </h3>
      </div>
    );
  }
  if (!userId) {
    return (
      <div className="flex h-[100vh] flex-col items-center justify-center">
        <h3>User signup failed,no User logged in</h3>
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-y-auto h-screen">
      <LeftBar />
      {children}
      <RightBar />
    </div>
  );
};

export default SocialLayout;
