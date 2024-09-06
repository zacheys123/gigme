import { Search } from "lucide-react";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useStore from "@/app/zustand/useStore";
import { PropTypes } from "prop-types";
const Gigheader = ({
  typeOfGig,
  setTypeOfGig,
  category,
  setCategory,
  gigQuery,
  location,
  setLocation,
}) => {
  const { search, setSearch } = useStore();

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
  const dataCounties = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Meru",
    "Kakamega",
    "Kiambu",
    "Bungoma",
    "Voi",
    "Machakos",
    "Kilifi",
    "Mandera",
    "Tharaka-Nithi",
    "Kajiado",
    "Kericho",
    "Lamu",
    "Nyeri",
    "Nakuru",
    "Kisii",
    "Muranga",
    "Garissa",
    "Kilimanjaro",
    "Elgeyo-Marakwet",
    "Mugumu",
    "Bomet",
    "Siaya",
    "Kakuma",
    "Isiolo",
    "Kitui",
    "Vihiga",
    "All",
  ];
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
            className="flex gap-2 items-center bg-gray-100 px-2 rounded-full h-[30px]  w-[214px]"
            variant={variant}
          >
            <input
              placeholder="searchBy: title,time('from' or 'to'),"
              className="h-[28px]  flex-1 ml-2 text-black bg-inherit   text-[11px] focus-within:right-0 outline-none placeholder-muted-foreground"
              value={typeOfGig}
              onChange={(ev) => {
                setTypeOfGig(ev.target.value);
              }}
              onKeyDown={gigQuery}
            />
            <div
              className="bg-gray-300 p-1 rounded-full"
              onClick={() => setSearch(false)}
            >
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
        className=" w-[60px] bg-white pl-2 element-with-overflow  h-[20px] rounded-md  text-[9px] font-bold  font-mono"
        value={location}
        onChange={(ev) => {
          setLocation(ev.target.value);
        }}
      >
        {dataCounties?.map((d, idx) => (
          <option key={idx} value={d}>
            {d}
          </option>
        ))}
      </select>
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

Gigheader.propTypes = {
  typeOfGig: PropTypes.string,
  setTypeOfGig: PropTypes.func,
  category: PropTypes.string,
  setCategory: PropTypes.func,
  gigQuery: PropTypes.func,
};
