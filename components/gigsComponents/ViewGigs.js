"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaSortDown } from "react-icons/fa6";
import Published from "./Published";
import Created from "./Created";
const ViewGigs = ({ user }) => {
  const [toggle, setToggle] = useState();

  return (
    <div className="min-h-screen w-full ">
      <Button
        variant="secondary"
        onClick={() => {
          setToggle((prev) => !prev);
        }}
        className="flex justify-between  choice"
      >
        <span>{!toggle ? "Published Gigs" : "My Gigs"}</span>
        <FaSortDown className="ml-2" />
      </Button>
      {!toggle ? <Published user={user} /> : <Created />}
    </div>
  );
};
// overflow-auto element-with-scroll
export default ViewGigs;
