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
import GigsModal from "./modals/GigsModal";

const SearchComponent = ({ data }) => {
  const { userId } = useAuth();
  const { searchQuery, setViewGig, SetSearchedUser } = useStore();
  const { user: curr } = useCurrentUser(userId);

  const { notification } = useNotification();
  const myid = curr?.user?._id;
  const [mess, setSenderMess] = useState("");

  const handleSendNotification = useCallback(
    (user) => {
      SetSearchedUser(user);
      setViewGig(true);
    },
    [setViewGig, SetSearchedUser]
  );

  return (
    <>
      <GigsModal />
      <div className="bg-black w-[100vw] h-[calc(100vh-80px)] lg:hidden overflow-hidden">
        {mess && notification.data._id !== myid && (
          <MyNotifications
            message={mess}
            senderId={notification.data._id}
            setSenderMess={setSenderMess}
            mess={mess}
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
                    handleSendNotification={() => handleSendNotification(user)}
                  />
                ))
            : data
                ?.filter((user) => user.clerkId !== userId)
                .map((user) => (
                  <MainUser
                    key={user._id}
                    user={user}
                    searchquery={searchQuery}
                    handleSendNotification={() => handleSendNotification(user)}
                  />
                ))}
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
