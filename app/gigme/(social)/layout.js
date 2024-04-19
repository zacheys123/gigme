"use client";
import { useGlobalContext } from "@/app/Context/store";
import OverlaySearch from "@/components/OverlaySearch";
import SocialNav from "@/components/SocialNav";
import React from "react";

const GigmeLayout = ({ children }) => {
  const {
    userState: { toggle },
  } = useGlobalContext();
  console.log(toggle);
  return (
    <div>
      <SocialNav />
      {toggle ? <OverlaySearch /> : <>{children}</>}{" "}
    </div>
  );
};

export default GigmeLayout;
