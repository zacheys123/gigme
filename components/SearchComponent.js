"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import MainUser from "./MainUser";

import { useAuth } from "@clerk/nextjs";
import useStore from "@/app/zustand/useStore";
import useSocket from "@/hooks/useSocket";
import { debounce } from "@/utils/debounce";
import { searchFunc } from "@/utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import MyNotifications from "./MyNotifications";
import { useNotification } from "@/app/Context/notificationContext";

const SearchComponent = ({ data }) => {
  const { userId } = useAuth();
  const { socket } = useSocket();
  const { searchQuery } = useStore();
  const { user: curr } = useCurrentUser(userId);

  const myid = curr?.user?._id;

  const handleSendNotification = useCallback(
    (user) => {
      if (!socket || !user) return;

      const message = "A gig is available, are you on?Click gigup to view.";
      console.log(`Sending notification to ${user.firstname}`);

      socket.emit("sendNotification", {
        myid,
        recipient: user,
        recipientId: user._id,
        message,
      });
    },
    [socket, myid]
  );

  const debouncedSendNotification = useCallback(
    debounce(handleSendNotification, 100),
    [handleSendNotification]
  );

  return (
    <div className="bg-black w-[100vw] h-[calc(100vh-80px)] lg:hidden overflow-hidden">
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
                />
              ))}
      </div>
    </div>
  );
};

export default SearchComponent;
