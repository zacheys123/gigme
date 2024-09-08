import React from "react";
import OverlaySearch from "@/components/OverlaySearch";

import SearchComponent from "@/components/SearchComponent";

import ClientOnly from "@/app/ClientOnly";
import { getAllUsers } from "@/app/server-actions/getAllUsers";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";

const SearchPage = async ({ params }) => {
  // const id = JSON.parse(window?.localStorage.getItem("user"));
  const { userId } = auth();
  const user = await getCurrentUser(params);
  const users = await getAllUsers(user?.user?._id);
  return (
    <div className=" w-[100vw] h-[100vh] ">
      <ClientOnly>
        <SearchComponent data={users} />
      </ClientOnly>
      <ClientOnly>
        <OverlaySearch />
      </ClientOnly>
    </div>
  );
};

export default SearchPage;
