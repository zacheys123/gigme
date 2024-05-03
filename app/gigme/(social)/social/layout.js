"use client";
import SocialNav from "@/components/GigmeNav";
import LeftBar from "@/components/socials/LeftBar";
import RightBar from "@/components/socials/RightBar";
import { useAuth, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { useEffect } from "react";
const SocialLayout = ({ children }) => {
  const { userId } = useAuth();
  console.log(userId);
  const id = () => {
    let data = window?.localStorage.getItem("user");
    if (!data) {
      return null;
    }

    return JSON.parse(data);
  };

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["userdata"],
    queryFn: async () => {
      const res = await fetch(`../api/user/getuser/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { OnlyUser } = await res.json();
      console.log(OnlyUser);
      return OnlyUser;
    },
  });

  if (status === "pending") {
    return <div>Loading...</div>;
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
