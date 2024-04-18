import React from "react";
import { Input } from "@/components/ui/input";

import { Search, SearchIcon } from "lucide-react";
import { TextInput, Label } from "flowbite-react";
import { Avatar } from "@mui/material";
const SearchPage = () => {
  return (
    <div className="relative bg-slate-700 w-[100vw] h-[100vh]">
      <form className=" w-[100vw] ">
        <div className=" flex justify-center items-center">
          <Input
            className="w-[100vw] mx-4 my-10 bg-black text-neutral-300"
            id="search"
            type="text"
            placeholder="Find anyone/username/instrument..."
            required
          />
        </div>
      </form>

      <div className=" bg-gray-100/80 ml-[40px] w-[300px] rounded-xl p-3">
        <div className="flex gap-2">
          {" "}
          <Avatar className="rounded-full" />
          <div>
            <div className="flex flex-col gap-2">Zachari Muigai</div>
            <div>zachyb92@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
