import React from "react";
import OverlaySearch from "@/components/OverlaySearch";

import SearchComponent from "@/components/SearchComponent";

import ClientOnly from "@/app/ClientOnly";

import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { auth } from "@clerk/nextjs";
import FormData from "@/components/FormData";
import { checkEnvironment } from "@/utils";

async function getAllUsers(id) {
  try {
    const res = await fetch(
      `${checkEnvironment()}/api/user/getAllusers/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { currentuser } = await res.json();

    return currentuser;
  } catch (error) {
    console.log("error getting all users  in search page", error);
  }
}
const SearchPage = async ({ params }) => {
  const { userId } = auth();
  const user = await getCurrentUser(params);
  const users = await getAllUsers(userId);
  console.log(users);
  return (
    <div className=" w-[100vw] h-[calc(100vh-80px)] bg-slate-900 overflow-y-hidden">
      <FormData data={users} />
      <SearchComponent data={users} userd={user} />

      <OverlaySearch />
    </div>
  );
};

export default SearchPage;
