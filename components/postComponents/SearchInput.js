import React, { useCallback } from "react";
import { debounce } from "lodash";

import useStore from "@/app/zustand/useStore";
import { searchFunc } from "@/utils";

const SearchInput = ({ data }) => {
  const { searchQuery, setSearchQuery } = useStore();

  const handleInputChange = useCallback(
    debounce((value) => setSearchQuery(value), 300), // 300ms debounce
    []
  );

  return (
    <input
      autoComplete="off"
      onChange={(ev) => handleInputChange(ev.target.value)}
      value={searchquery}
      className="w-[70%] mx-1  bg-slate-800 text-neutral-200  font-bold focus-within:ring-0 outline-none placeholder-gray-200 p-3 -0 text-[13px] my-6"
      id="search"
      type="text"
      data-autofocus
      placeholder="Find anyone/username/instrument..."
      required
      onKeyDown={(ev) => searchFunc(data, searchQuery)}
    />
  );
};

export default SearchInput;
