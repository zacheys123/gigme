"use client";
import React from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";
import { createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import useStore from "../zustand/useStore";
import useSocket from "@/hooks/useSocket";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { userId } = useAuth();

  const { user } = useCurrentUser(userId);
  const { setOnlineUsers } = useStore();

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
// PropTypes validation for the children prop
SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Children must be a valid React node
};
