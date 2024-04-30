"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

import { Search, SearchIcon } from "lucide-react";
import { TextInput, Label } from "flowbite-react";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import OverlaySearch from "@/components/OverlaySearch";
import MainUser from "@/components/MainUser";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
const SearchPage = () => {
  const [searchquery, setSearchhQuery] = useState("");
  const router = useRouter();
  // const id = JSON.parse(window?.localStorage.getItem("user"));
  const { userId } = useAuth();
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["alluserdata"],
    queryFn: async () => {
      const res = await fetch(`../api/user/getAllusers/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { currentuser } = await res.json();
      console.log(currentuser);
      return currentuser;
    },
  });
  const searchFn = (ev) => {
    let sortedData = data;
    if (searchquery) {
      sortedData = sortedData?.filter((user) => {
        if (
          user?.firstname?.toLowerCase().includes(searchquery) ||
          user?.lastname?.toLowerCase().includes(searchquery) ||
          user?.username?.toLowerCase().includes(searchquery)
        ) {
          return sortedData;
        }
      });
    }
    return sortedData;
  };

  return (
    <div className=" w-[100vw] h-[100vh] ">
      <div className="relative bg-slate-800/70 w-[100vw] h-[100vh] md:hidden">
        <form className=" w-[100vw] ">
          <div className=" flex justify-center items-center">
            <Input
              onChange={(ev) => setSearchhQuery(ev.target.value)}
              value={searchquery}
              className="w-[100vw] mx-4 my-10 bg-black text-neutral-200 placeholder-red-600"
              id="search"
              type="text"
              placeholder="Find anyone/username/instrument..."
              required
              onKeyDown={(ev) => searchFn(ev)}
            />
          </div>
        </form>
        {searchquery &&
          searchFn &&
          searchFn()?.map((user) => {
            return !isFetching ? (
              <MainUser user={user} key={user?._id} searchquery={searchquery} />
            ) : (
              <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <OverlaySearch />
    </div>
  );
};

export default SearchPage;
