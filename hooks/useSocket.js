import useStore from "@/app/zustand/useStore";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export function useSocket() {
  const { socket, setSocket } = useStore();
  // const userOnline = onlineUsers.includes(myUser?.user?._id);
  useEffect(() => {
    const s = io("mygigserver.vercel.app");
    setSocket(s);

    return () => s.close(); // Cleanup on unmount
  }, []);
  return { socket };
}
