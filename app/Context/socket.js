"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { authReducer } from "@/reducers/authReducers";
import { useAuth } from "@clerk/nextjs";
import { createContext, useContext, useMemo, useEffect, useState } from "react";

import useStore from "../zustand/useStore";
import { useSocket } from "@/hooks/useSocket";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { userId } = useAuth();

  const { user } = useCurrentUser(userId);
  const { setOnlineUsers } = useStore();
  console.log(user);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket?.connected === true && user) {
      socket?.emit("addNewUsers", user?.user?._id);
      socket?.on("getOnlineUsers", (res) => {
        setOnlineUsers(res);
        console.log(res);
      });

      return () => {
        socket?.off("getOnlineUsers");
      };
    }
  }, [socket, setOnlineUsers, user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export const useSocketContext = () => useContext(SocketContext);
