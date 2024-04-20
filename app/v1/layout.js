import Nav from "@/components/Nav";
import ProfileNav from "@/components/ProfileNav";
import { auth } from "@clerk/nextjs";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="flex ">
      <ProfileNav />
      {children}
    </div>
  );
};

export default MainLayout;
