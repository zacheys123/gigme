"use client";
import { useParams } from "next/navigation";
import React from "react";

const FriendsPage = () => {
  const { search } = useParams();
  console.log(search);

  return <div>A friend is Found Here</div>;
};

export default FriendsPage;
