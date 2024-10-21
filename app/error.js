"use client";
import React from "react";
import { useRouter } from "next/navigation";
import UsersButton from "@/components/UsersButton";
import Link from "next/link";
import { Box } from "@mui/material";
const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Box className="flex-col h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center px-6 py-12 max-w-lg">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-4">404</h1>
          <p className="text-1xl font-semibold text-gray-800 mb-2">
            Oops! Page not found
          </p>
          <p className="text-gray-600 mb-6 text-[11px] ">
            {`The page you're looking for doesn't exist. Maybe you mistyped the
            URL?`}
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="px-5 text-[13px] py-2 rounded-lg bg-blue-600 text-white text-lg hover:bg-blue-700 transition"
            >
              Go Home
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 text-lg hover:bg-blue-100 transition"
            ></Link>
          </div>
        </div>
        <div className="flex justify-center">
          <span>OR</span>
        </div>
        <ul type="" className="flex flex-col gap-2 mt-3  p-3 text-neutral-900 ">
          <li className="text-[11px]">
            -Network problems,check that you are connected to the internet.
          </li>
          <li className="text-[11px]">
            -Check your Time And Date settings,make sure they are correct.
          </li>{" "}
          <li className="text-[11px]">
            -Check with the service provider to see the problem.
          </li>{" "}
          <li className="text-[11px]">-Check whether its the correct URL.</li>
          <li className="text-[11px]">-Reload this Page.</li>
        </ul>{" "}
        <UsersButton
          title="Reload"
          onClick={() => router.back()}
          className="text-right bg-blue-600 text-white font-mono font-semibold p-3 mt-3 rounded-xl"
        />
      </Box>
    </div>
  );
};

export default ErrorPage;
