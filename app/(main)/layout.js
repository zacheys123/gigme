import Nav from "@/components/Nav";

import React from "react";
import UserModal from "@/components/modals/UserModal";

import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
import { getChats } from "../server-actions/getChats";

export const getCurrentUser = async (userId) => {
  try {
    const res = await fetch(`${checkEnvironment()}/api/user/getuser/${userId}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const MainLayout = async ({ children }) => {
  const { userId } = auth();
  const currentUser = await getCurrentUser(userId);
  const chats = await getChats(currentUser?.user?._id);
  return (
    <div className=" h-screeen overflow-x-hidden ">
      <UserModal />
      <Nav chats={chats} />
      {children}
    </div>
  );
};

export default MainLayout;
