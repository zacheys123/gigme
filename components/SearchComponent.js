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
  const { searchQuery } = useStore();

  // @saak1sak2

  return (
    <div className=" bg-slate-800 w-[100vw] h-[100vh] lg:hidden ">
      <div className=" overflow-y-auto h-[100vh] w-[100vw] my-[25px]">
        {searchQuery &&
          searchFunc &&
          searchFunc(data, searchQuery)?.map((user) => {
            return (
              <MainUser user={user} key={user?._id} searchquery={searchQuery} />
            );
          })}
      </div>
    </div>
  );
};

export default SearchComponent;
