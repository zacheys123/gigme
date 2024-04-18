import React from "react";
import { Input } from "@/components/ui/input";

import { Search, SearchIcon } from "lucide-react";
import { TextInput, Label } from "flowbite-react";
const SearchPage = () => {
  return (
    <div className="relative bg-slate-700 w-[100vw] h-[100vh]">
      <form className="absolute w-[100vw] ">
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
    </div>
  );
};

export default SearchPage;
