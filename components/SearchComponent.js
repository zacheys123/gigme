"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import MainUser from "./MainUser";

import { useAuth } from "@clerk/nextjs";
import useStore from "@/app/zustand/useStore";

import { debounce } from "@/utils/debounce";
import { searchFunc } from "@/utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import MyNotifications from "./MyNotifications";
import { useNotification } from "@/app/Context/notificationContext";
import GigsModal from "./modals/GigsModal";
import { motion } from "framer-motion";

const SearchComponent = ({ data }) => {
  const { userId } = useAuth();
  const { searchedUser, searchQuery, setViewGig, SetSearchedUser } = useStore();

  const handleSendNotification = useCallback(
    (user) => {
      if (!user) {
        console.log("User not found");
      } else {
        SetSearchedUser(user);
        setViewGig(true);
      }
    },
    [setViewGig, SetSearchedUser, searchedUser]
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: "-1500px" }}
        animate={{ opacity: 1, y: "500px" }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <GigsModal />
      </motion.div>
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
