"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "@clerk/nextjs";
import useSocket from "@/hooks/useSocket";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  const { socket } = useSocket();
  const [notification, setNotification] = useState({
    data: { _id: "" },
    message: "",

    createdAt: new Date(),
  });

  const notificationRef = useRef(notification);
  const myid = user?.user?._id;
  useEffect(() => {
    notificationRef.current = notification;
  }, [notification]);

  // Join user's room on component mount
  useEffect(() => {
    if (socket && myid) {
      console.log(`Joining room for user: ${myid}`);
      socket.emit("joinRoom", { userId: { _id: myid } }); // Join your own room
    }
  }, [socket, myid]);

  // Handle incoming notifications
  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      console.log("Notification received:", data);

      setNotification(data); // Update state directly
    };

    socket.on("notification", handleNotification);

    // Cleanup on unmount to avoid memory leaks
    return () => socket.off("notification", handleNotification);
  }, [socket, myid]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
