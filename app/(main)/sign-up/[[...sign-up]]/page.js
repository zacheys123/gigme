import { SignUp } from "@clerk/nextjs";
import React from "react";
export default function Page() {
  return (
    <div className=" h-[calc(100vh-60px)] bg-black w-full overflow-hidden">
      <div className="flex justify-center items-center  h-full w-full shadow-slate-700 shadow-xl">
        {" "}
        <SignUp />;
      </div>
    </div>
  );
}
