"use client";
import { useParams } from "next/navigation";
import React from "react";

const FriendsProfilePage = () => {
  const { search } = useParams();
  console.log(search);

  return <div>A friend is Found Here</div>;
};

export default FriendsProfilePage;
