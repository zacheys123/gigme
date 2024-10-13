import useStore from "@/app/zustand/useStore";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export function useSocket() {
  const { socket, setSocket } = useStore();
  // const userOnline = onlineUsers.includes(myUser?.user?._id);
  useEffect(() => {
    const s = io("http://localhost:8080", {
      timeout: 10000,
      reconnectionAttempts: 10, // Maximum number of reconnection attempts
      reconnectionDelay: 3000, // Initial delay before the first reconnection attempt
      // reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts

      // transports: ['websocket', 'polling'] // Transports to use (e.g., websocket, polling)
      // upgrade: false, // Set to true to enable WebSocket Upgrade Protocol (e.g., for secure WebSocket connections)
      // secure: false, // Set to true to enable secure WebSocket connections (e.g., using HTTPS)
      // path: "/socket.io" // Path for the Socket.IO server
      // auth: { token: localStorage.getItem("token") } // Authentication token for WebSocket connection
    });
    setSocket(s);

    return () => s.close(); // Cleanup on unmount
  }, []);
  return { socket };
}
