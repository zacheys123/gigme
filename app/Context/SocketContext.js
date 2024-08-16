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
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnline] = useState([]);

  const [id, setId] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("user");
      if (!id) {
        return;
      }
      setId(id);
      return JSON.parse(id);
    }
  }, []);
  const { userState } = useGlobalContext();
  console.log(userState);
  useEffect(() => {
    if (id) {
      const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
        query: {
          userId: id._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnline(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        setOnline([]);
      }
    }
  }, [id]);
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
