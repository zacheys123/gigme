"use client";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const SocialPage = () => {
  const { userId } = useAuth();
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

  if (isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-3xl">Welcome ,{data[0]?.firstname}</h1>
    </div>
  );
};

export default SocialPage;
