"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { authReducer } from "@/reducers/authReducers";
import { useAuth } from "@clerk/nextjs";
import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useStore from "../zustand/useStore";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { userId } = useAuth();
  const [socket, setSocket] = useState(null);
  const { user } = useCurrentUser(userId);
  const { setOnlineUsers } = useStore();
  console.log(user);
  useEffect(() => {
    const socket = io("http://localhost:8080");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [user]);
  useEffect(() => {
    if (socket === null) {
      return;
    }
    socket.emit("addNewUsers", user?.user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
      console.log(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, setOnlineUsers, user]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export const useSocketContext = () => useContext(SocketContext);
