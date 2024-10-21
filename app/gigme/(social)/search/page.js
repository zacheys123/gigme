import React from "react";
import OverlaySearch from "@/components/OverlaySearch";

import SearchComponent from "@/components/SearchComponent";

import ClientOnly from "@/app/ClientOnly";
import { getAllUsers } from "@/app/server-actions/getAllUsers";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { auth } from "@clerk/nextjs";
import FormData from "@/components/FormData";

const SearchPage = async ({ params }) => {
  const user = await getCurrentUser(params);
  const users = await getAllUsers(user?.user?._id);
  return (
    <ClientOnly>
      <div className=" w-[100vw] h-[calc(100vh-80px)] bg-slate-900 overflow-y-hidden">
        <FormData data={users} />
        <SearchComponent data={users} userd={user} />

        <OverlaySearch />
      </div>{" "}
    </ClientOnly>
  );
};

export default SearchPage;
