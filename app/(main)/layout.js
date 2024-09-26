import Nav from "@/components/Nav";
import UserModal from "@/components/UserModal";
import React from "react";
import useStore from "../zustand/useStore";

const MainLayout = ({ children }) => {
  return (
    <div>
      <UserModal />
      <Nav />
      {children}
    </div>
  );
};

export default MainLayout;
