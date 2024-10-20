"use client";
import useStore from "@/app/zustand/useStore";
import { searchFunc, searchfunc } from "@/utils";
import { Search } from "@mui/icons-material";
import debounce from "lodash.debounce";
import React, { useCallback } from "react";
import SearchInput from "./postComponents/SearchInput";

const FormData = ({ data }) => {
  return (
    <form className="w-[100vw] h-[70px]  fixed ">
      <div className=" flex justify-center items-center w-[90vw] mx-auto h-[50px] border-2 border-b-neutral-600 border-r-0 border-l-0 border-t-0  ">
        <Search
          size="17px"
          sx={{ color: "white" }}
          className="text-gray-200 my-6"
        />
        <SearchInput data={data} />
      </div>
    </form>
  );
};

export default FormData;
