"use client";
import React from "react";
import { useRouter } from "next/navigation";
import UsersButton from "@/components/UsersButton";
const NotFound = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div>
        {" "}
        <h2 className="text-3xl font-bold">404!!Page Not Found</h2>
        <h3 className="text-2xl font-semibold">The cause might be:</h3>
      </div>
      <ul
        type="disc"
        className="flex flex-col gap-2 mt-3 bg-gray-600/80 p-3 text-neutral-300 rounded-xl"
      >
        <li>Network problems,check that you are connected to the internet.</li>
        <li>
          Check your Time And Date settings,make sure they are correct.
        </li>{" "}
        <li>Check with the service provider to see the problem.</li>{" "}
        <li>Check whether its the correct URL.</li>
        <li>Reload this Page.</li>
      </ul>
      <UsersButton
        title="Reload"
        onClick={() => router.back()}
        className="text-right bg-blue-600 text-white font-mono font-semibold p-3 mt-3 rounded-xl"
      />
    </div>
  );
};

export default NotFound;
