"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaSortDown } from "react-icons/fa6";
import Published from "./Published";
import Created from "./Created";
import AllGigs from "./AllGigs";
import ClientOnly from "@/app/ClientOnly";
import useStore from "@/app/zustand/useStore";
import BookedGigs from "./BookedGigs";
const ViewGigs = ({ user }) => {
  const [typeOfGig, setTypeOfGig] = useState("published");
  const [created, setCreated] = useState();
  const [published, setPublished] = useState();
  const [allGigs, setAllGigs] = useState();
  const handleVal = (ev) => {
    setTypeOfGig(ev.target.value);
  };
  console.log(typeOfGig);
  const { setSearch } = useStore();
  return (
    <ClientOnly>
      <div className="min-h-screen w-full justify-center items-center">
        <select
          onClick={() => setSearch(false)}
          value={typeOfGig}
          onChange={handleVal}
          className="mb-2 w-[150px] bg-neutral-600 shadow-md  pl-2  shadow-red-700 text-white  h-[30px] rounded-md  text-[11px]  font-mono"
        >
          <option
            // onClick={() => {
            //   setPublished(false);
            //   setCreated(false);
            //   setAllGigs(false);
            // }}
            value="published"
          >
            Published Gigs
          </option>
          <option
            value="mygigs"
            onClick={() => {
              // setPublished(true);
              // setCreated(true);
              // setAllGigs(false);
            }}
          >
            MyGigs
          </option>
          <option
            value={"allgigs"}
            onClick={() => {
              // setPublished(true);
              // setCreated(false);
              // setAllGigs(true);
            }}
          >
            All Gigs
          </option>
          <option
            value={"bookedgigs"}
            onClick={() => {
              // setPublished(true);
              // setCreated(false);
              // setAllGigs(true);
            }}
          >
            Booked Gigs
          </option>
        </select>{" "}
        {typeOfGig === "published" && <Published user={user} />}{" "}
        {typeOfGig === "mygigs" && <Created user={user} />}
        {typeOfGig === "allgigs" && <AllGigs user={user} />}
        {typeOfGig === "booked" && <BookedGigs user={user} />}
      </div>
    </ClientOnly>
  );
};
// overflow-auto element-with-scroll
export default ViewGigs;
