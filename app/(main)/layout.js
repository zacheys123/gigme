import Nav from "@/components/Nav";
import { auth } from "@clerk/nextjs";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default MainLayout;
