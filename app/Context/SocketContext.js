"use client";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const SocketContext = createContext();
import { io } from "socket.io-client";
import { useGlobalContext } from "./store";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";
export const SocketContextProvider = ({ children }) => {
  const { userId } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnline] = useState([]);

  const { loading, user, setUser } = useCurrentUser(userId);

  console.log(user);
  useEffect(() => {
    if (user) {
      const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
        query: {
          userId: user?.user?._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnline(users);
      });
      return () => socket.close();
    } else {
      if (socket || user === null) {
        socket.close();
        setSocket(null);
        setOnline([]);
        setUser({});
      }
    }
  }, [user?.user?._id]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};
