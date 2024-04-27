"use client";
import { useAuth, useUser } from "@clerk/nextjs";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
const Authenticate = () => {
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
    } else {
      router.push(`/v1/profile/${userId}`);
    }
  }, [user, router, userId]);

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
    <div>
      <h1 className="text-header1 text-3xl">
        Authenticate and register new user here
      </h1>
    </div>
  );
};

export default Authenticate;
