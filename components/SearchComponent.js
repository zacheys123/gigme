"use client";

import React, { useEffect, useState } from "react";
import MainUser from "./MainUser";
import Notification from "./Notification";
import { useAuth } from "@clerk/nextjs";
import useStore from "@/app/zustand/useStore";
import useSocket from "@/hooks/useSocket";
import { debounce } from "@/utils/debounce";
import { searchFunc } from "@/utils";

const SearchComponent = ({ data }) => {
  const { userId } = useAuth();
  const { socket } = useSocket();
  const { searchQuery } = useStore();

  const [notification, setNotification] = useState(null);

  // Join user's room on component mount
  const handleJoin = (id) => {
    if (socket && id) {
      console.log(`Joining room for user: ${id?._id}`);
      socket.emit("joinRoom", { userId: { _id: id?._id } });
    }
  };

  // Handle incoming notifications
  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      console.log("Notification received:", data.message); // Check if this log appears
      if (data?.data?.clerkId === userId) {
        setNotification(data);
      }
    };

    socket.on("notification", handleNotification);

    return () => socket.off("notification", handleNotification);
  }, [socket, userId]);

  const handleSendNotification = (user) => {
    if (!socket || !user) return;

    const message = "A gig is available, are you on?";
    console.log(`Sending notification to ${user.firstname}`);

    socket.emit("sendNotification", {
      recipient: user,
      recipientId: user._id,
      message,
    });
  };

  const debouncedSendNotification = debounce(handleSendNotification, 100);

  return (
    <div className="bg-black w-[100vw] h-[calc(100vh-80px)] lg:hidden overflow-hidden">
      {notification && (
        <Notification
          message={notification.message}
          senderId={notification.data.clerkId}
        />
      )}
      <div className="overflow-y-auto h-full w-full my-4 py-10 space-y-4">
        {data && searchQuery
          ? searchFunc(data, searchQuery)
              .filter((user) => user.clerkId !== userId)
              .map((user) => (
                <MainUser
                  key={user._id}
                  user={user}
                  searchquery={searchQuery}
                  handleSendNotification={() => debouncedSendNotification(user)}
                  getUserId={handleJoin}
                />
              ))
          : data
              .filter((user) => user.clerkId !== userId)
              .map((user) => (
                <MainUser
                  key={user._id}
                  user={user}
                  searchquery={searchQuery}
                  handleSendNotification={() => debouncedSendNotification(user)}
                  getUserId={handleJoin}
                />
              ))}
      </div>
    </div>
  );
};

export default SearchComponent;
