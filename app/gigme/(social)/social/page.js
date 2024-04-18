"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const SocialPage = () => {
  const id = JSON.parse(window?.localStorage.getItem("user"));

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["userdata"],
    queryFn: async () => {
      const res = await fetch(`../api/user/getuser/${id?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { OnlyUser } = await res.json();

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
