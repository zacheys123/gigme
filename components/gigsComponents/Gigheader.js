import { Search } from "lucide-react";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
const Gigheader = ({
  typeOfGig,
  setTypeOfGig,
  category,
  setCategory,
  gigQuery,
}) => {
  const [search, setSearch] = useState();
  let variant = {
    initial: {
      x: ["-200px"],
      opacity: 0,
    },
    animate: {
      opacity: 1,

      x: ["-200px", "-100px", "-50px", "0px", "50px", "0px"],
    },
    transition: {
      duration: 1.3,
    },
  };
  return (
    <div className="flex justify-around  mb-1">
      <div>
        {!search ? (
          <div
            className="bg-gray-200 rounded-full p-1 cursor-pointer"
            onClick={() => setSearch(true)}
          >
            <Search size="15px" />
          </div>
        ) : (
          <motion.div
            className="flex gap-2 items-center bg-gray-100 p-1 rounded-full h-[25px]  w-[214px]"
            variant={variant}
          >
            <input
              placeholder="filterBy:location,time,"
              className="h-[24px] w-[165px] ml-2 text-black bg-inherit   text-[11px] focus-within:right-0 outline-none placeholder-muted-foreground"
              value={typeOfGig}
              onChange={(ev) => {
                setTypeOfGig(ev.target.value);
              }}
              onKeyDown={gigQuery}
            />
            <div className="" onClick={() => setSearch(false)}>
              <Search
                size="12px"
                sx={{
                  color: "gray",
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
      <select
        className=" w-[50px] bg-white pl-2  h-[20px] rounded-md  text-[9px] font-bold  font-mono"
        value={category}
        onChange={(ev) => {
          setCategory(ev.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="piano">piano</option>
        <option value="guitar">guitar</option>
        <option value="bass">bass</option>
        <option value="sax">sax</option>
        <option value="other">other</option>
        <option value="ukulele">ukulele</option>
        <option value="full">fullband</option>{" "}
        <option value="personal">personal</option>{" "}
      </select>
    </div>
  );
};

export default Gigheader;
