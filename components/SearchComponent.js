"use client";
import React, { useEffect, useState } from "react";
import MainUser from "./MainUser";
import Notification from "./Notification";
import { useAuth } from "@clerk/nextjs";
import useStore from "@/app/zustand/useStore";
import { debounce } from "@/utils/debounce";
import useSocket from "@/hooks/useSocket";
import { searchFunc } from "@/utils";

const SearchComponent = ({ data }) => {
  const { userId } = useAuth(); // User's ID from Clerk
  const { socket } = useSocket(); // Socket instance from custom hook
  const { searchQuery } = useStore(); // Zustand store for search state

  const [usersData, setUsersData] = useState(data);
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [senderId, setSenderId] = useState(null); // Store the sender's ID

  const [selectedUser, setSelectedUser] = useState(null); // Target user for notifications

  const handleJoinRoom = (user) => {
    setSelectedUser(user);
    if (socket) {
      socket.emit("joinRoom", { userId: { _id: user._id } });
    } else {
      console.warn("Socket not available");
    }
  };

  useEffect(() => {
    if (!socket) return;

    console.log("Socket connected. Listening for notifications...");

    const handleNotification = (data) => {
      console.log("Notification received:", data);
      if (data?.data?.clerkId !== userId) {
        setMessage(data.message);
        setSenderId(data.data.clerkId);
        setNotification(true); // Trigger notification display
      }
    };

    socket.on("notification", handleNotification);

    return () => {
      console.log("Cleaning up socket listener...");
      socket.off("notification", handleNotification);
    };
  }, [socket, userId]);
  const handleSendNotification = () => {
    if (!socket || !selectedUser) {
      console.warn("Socket or selectedUser is not available");
      return;
    }

    const message = "A gig is available, are you on??!!!";
    socket.emit("sendNotification", {
      otheruser: selectedUser,
      message,
    });
  };

  const debouncedSendNotification = debounce(handleSendNotification, 300);

  return (
    <div className="bg-black w-[100vw] h-[calc(100vh-80px)] lg:hidden overflow-scroll">
      {notification && <Notification message={message} />}{" "}
      {/* Display notification */}
      <div className="overflow-y-auto h-full w-full my-4 py-10 fixed">
        {searchQuery &&
          searchFunc(data, searchQuery)
            ?.filter((user) => user.clerkId !== userId)
            ?.map((user) => (
              <MainUser
                key={user._id}
                user={user}
                searchquery={searchQuery}
                debHandlePermission={debouncedSendNotification}
                getUserId={handleJoinRoom}
              />
            ))}
      </div>
    </div>
  );
};

export default SearchComponent;
