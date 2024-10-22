"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { Search, SearchIcon } from "lucide-react";
import { TextInput, Label } from "flowbite-react";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import MainUser from "./MainUser";
import { useAuth } from "@clerk/nextjs";
import useStore from "@/app/zustand/useStore";
import { searchFunc } from "@/utils";
import Notification from "./Notification";
import { debounce } from "@/utils/debounce";
import useSocket from "@/hooks/useSocket";
import { useCurrentUser } from "@/hooks/useCurrentUser";
const SearchComponent = ({ userd, data }) => {
  const { userId } = useAuth();
  const [usersdata, setData] = useState(data);

  // const getAllUsers = async () => {
  //   const res = await fetch(`/api/user/getAllusers/${userId}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const { currentuser } = await res.json();
  //   console.log(currentuser);
  //   setData(currentuser);
  //   return currentuser;
  // };
  // useEffect(() => {
  //   getAllUsers();
  // }, []);
  const { socket } = useSocket();
  const { searchQuery } = useStore();
  // // Use the search function
  // let otheruser = searchFunc(data, searchQuery) ?? [];
  // // Map to extract desired properties (e.g., id, name)
  // let extractedUsers = otheruser.map(({ id, name }) => ({ id, name }));
  const [notification, setNotification] = useState();
  const [mymess, setMess] = useState();
  const [otherId, setUserId] = useState({});
  const { user } = useCurrentUser(userId);
  const getUserId = (id) => {
    setUserId(id);
  };
  // @saak1sak2
  console.log(otherId, socket);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    if (!socket) return;

    if (otherId) {
      socket.emit("join", otherId); // Join room based on user ID

      socket.on("notification", (data) => {
        console.log("Notification received:", data);

        if (
          data?.data?.clerkId !== userId ||
          data?.data?.clerkId !== user?.user?.username
        ) {
          // Ignore if it's for the sender
          setMess(data?.message);
          setUserInfo(data?.data?.clerkId);
          setNotification(true);
        } else {
          console.log("Ignored own notification");
        }
      });

      return () => {
        socket.off("notification");
      };
    }
  }, [socket, otherId]);

  const handleRequestPermission = () => {
    if (!socket) return;

    // Check if otherId is valid before sending notification
    if (otherId && otherId !== undefined) {
      const message = "A gig is Available, are you on??!!!";

      socket.emit("sendNotification", {
        otherId,
        message,
      });
    } else {
      console.warn("otherId is not set.");
    }
  };

  const debHandlePermission = debounce(handleRequestPermission, 300);
  return (
    <div className=" bg-black w-[100vw] h-[calc(100vh-80px)]  lg:hidden overflow-scroll ">
      {notification && !userInfo && <Notification message={mymess} />}
      <div className=" overflow-y-auto h-[100%] w-[100vw] my-[15px] py-10 z-0 fixed">
        {searchQuery &&
          searchFunc &&
          searchFunc(data, searchQuery)
            ?.filter((user) => user?.clerkId !== userId)
            ?.map((user) => {
              return (
                <MainUser
                  user={user}
                  key={user?._id}
                  searchquery={searchQuery}
                  debHandlePermission={debHandlePermission}
                  getUserId={getUserId}
                />
              );
            })}
      </div>
    </div>
  );
};

export default SearchComponent;
