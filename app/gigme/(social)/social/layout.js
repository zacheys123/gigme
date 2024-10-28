"use client";
import ClientOnly from "@/app/ClientOnly";
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
  console.log(user);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const registerUser = useCallback(async () => {
    if (!user) {
      console.error("No user data to send.");
      return;
    }

    console.log("Sending user to backend:", user);

    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    const data = await res.json();
    console.log(data);
    window?.localStorage.setItem("user", JSON.stringify(data?.results));
    if (data?.userstatus === false) {
      return router.push("/gigme/social");
    }
  }, [user, router]);

  useEffect(() => {
    if (user && isSignedIn) {
      registerUser();
    } else {
      console.log("User data not available or not signed in.");
    }
  }, [user, isSignedIn, registerUser]);
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
      <ClientOnly>
        <LeftBar />
      </ClientOnly>
      {children}
      <ClientOnly>
        <RightBar />
      </ClientOnly>
    </div>
  );
};

export default SocialLayout;
