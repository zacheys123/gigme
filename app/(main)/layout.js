import Nav from "@/components/Nav";

import React from "react";
import useStore from "../zustand/useStore";
import UserModal from "@/components/modals/UserModal";

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
