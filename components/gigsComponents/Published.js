"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { Divider } from "@mui/material";
import { searchfunc } from "@/utils";

const Published = ({ user }) => {
  const { userId } = useAuth();
  const [typeOfGig, setTypeOfGig] = useState();
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();

  const [pubGigs, setPubGigs] = useState([]);
  let currentUser = user?.user?._id;
  const getGigs = async () => {
    const res = await fetch(`/api/gigs/getpub/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data?.gigs);
    setPubGigs(data?.gigs);
    return data;
  };
  useEffect(() => {
    getGigs();
  }, []);

  return (
    <div className="w-full h-full p-2 shadow-sm mt-3">
      <div className="mb-3 flex items-center gap-3">
        <Input
          placeholder="filterBy:location,time,"
          className="h-[40px] w-[200px]"
          value={typeOfGig}
          onChange={(ev) => {
            setTypeOfGig(ev.target.value);
          }}
        />
        <select
          className="mb-2 w-[80px] bg-white  h-[40px] rounded-md p-3 text-[11px]  font-mono"
          value={category}
          onChange={(ev) => {
            setCategory(ev.target.value);
          }}
        >
          <option disabled>category:</option>
          <option value="piano">piano</option>
          <option value="guitar">guitar</option>
          <option value="bass">bass</option>
          <option value="sax">sax</option> <option value="other">other</option>
          <option value="fullband">fullband</option>{" "}
          <option value="personal">personal</option>{" "}
        </select>
      </div>
      <Divider />
      <div className="bg-neutral-200 w-full h-[100%]">
        {/* content */}
        {searchfunc(pubGigs, typeOfGig, category, time, date, location).map(
          (gig) => {
            return (
              <div key={gig._id} className="p-4">
                <h4>{gig.title}</h4>
                <p>{gig.description}</p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Published;
