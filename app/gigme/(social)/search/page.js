import React from "react";
import OverlaySearch from "@/components/OverlaySearch";
import { auth } from "@clerk/nextjs";
import SearchComponent from "@/components/SearchComponent";
import { checkEnvironment } from "@/utils";
import ClientOnly from "@/app/ClientOnly";
async function search() {
  const { userId } = auth();
  const res = await fetch(
    `${checkEnvironment()}/api/user/getAllusers/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { currentuser } = await res.json();
  console.log(currentuser);
  return currentuser;
}
const SearchPage = async () => {
  // const id = JSON.parse(window?.localStorage.getItem("user"));
  const users = await search();
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
