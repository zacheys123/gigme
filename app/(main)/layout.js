import Nav from "@/components/Nav";
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
