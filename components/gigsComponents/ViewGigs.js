"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaSortDown } from "react-icons/fa6";
import Published from "./Published";
import Created from "./Created";
import AllGigs from "./AllGigs";
import ClientOnly from "@/app/ClientOnly";
const ViewGigs = ({ user }) => {
  const [typeOfGig, setTypeOfGig] = useState("published");
  const [created, setCreated] = useState();
  const [published, setPublished] = useState();
  const [allGigs, setAllGigs] = useState();
  const handleVal = (ev) => {
    setTypeOfGig(ev.target.value);
    if ((ev.target.value = "mygigs")) {
      setPublished(true);
      setCreated(true);
      setAllGigs(false);
    } else if (ev.target.value === "allgigs") {
      setPublished(true);
      setCreated(false);
      setAllGigs((prev) => !prev);
    } else if (ev.target.value === "published") {
      setPublished(true);
      setCreated(false);
      setAllGigs(false);
    }
  };
  console.log(typeOfGig);
  return (
    <div className="min-h-screen w-full ">
      <select
        value={typeOfGig}
        onChange={handleVal}
        className="mb-2 w-[170px] bg-neutral-600 shadow-md p-3 title shadow-red-700 text-white  h-[40px] rounded-md  text-[11px]  font-mono"
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
      </select>
      <ClientOnly>
        {" "}
        {typeOfGig === "published" && <Published user={user} />}{" "}
        {typeOfGig === "mygigs" && <Created user={user} />}
        {typeOfGig === "allgigs" && <AllGigs />}
      </ClientOnly>
    </div>
  );
};
// overflow-auto element-with-scroll
export default ViewGigs;
