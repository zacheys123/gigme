"use client";

import { useAuth, useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
const Authenticate = () => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  const { isLoaded, userId } = useAuth();
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
    <div>
      <h1 className="text-header1 text-3xl">
        Authenticate and register new user here
      </h1>
    </div>
  );
};

export default Authenticate;
