"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { Divider } from "@mui/material";
import { searchfunc } from "@/utils";
import Image from "next/image";

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
  const [readmore, setReadMore] = useState();
  const normalstyling =
    "w-[440px]  p-3 bg-neutral-100  shadow-lg rounded-tl-md rounded-tr-xl rounded-br-xl rounded-bl-xl";
  const readmorestyling =
    "w-[440px] h-[400px] p-3 bg-neutral-100  shadow-lg rounded-tl-md rounded-tr-xl rounded-br-xl rounded-bl-xl";
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
      <div className="bg-neutral-200 w-full h-[100%] overflow-y-scroll element-with-scroll">
        {/* content */}
        {searchfunc(pubGigs, typeOfGig, category).map((gig) => {
          return (
            <div key={gig._id} className="p-1 flex w-full mt-3 ">
              <div className="rounded-full w-[40px] h-[25px] bg-green-800"></div>
              <div className={readmore ? readmorestyling : normalstyling}>
                <div className="flex">
                  {" "}
                  <span className="title tracking-tighter">Gig Type:</span>
                  <span className="link text-red-700 font-bold line-clamp-1  ">
                    {gig.bussinesscat}
                  </span>
                </div>
                <div className="flex ">
                  {" "}
                  <span className="title">Gig title:</span>
                  <span className="link text-red-700 font-bold">
                    {gig.title}
                  </span>
                </div>
                <div className="flex">
                  {" "}
                  <span className="title tracking-tighter">Location:</span>
                  <span className="link text-red-700 font-bold line-clamp-1  ">
                    {gig.location}
                  </span>
                </div>
                <div className="flex">
                  {" "}
                  <span className="title tracking-tighter">Time:</span>
                  <span className="link text-red-700 font-bold line-clamp-1  ">
                    {gig.time.from}
                  </span>
                  &nbsp;
                  <span className="title">to</span> &nbsp;
                  <span className="link text-red-700 font-bold line-clamp-1  ">
                    {gig.time.to}
                  </span>
                </div>
                <div className="flex">
                  {" "}
                  <span className="title tracking-tighter">Contact:</span>
                  <span className="link text-red-700 font-bold line-clamp-1 blur-sm ">
                    {gig.phoneNo} 07342516453
                  </span>
                </div>
                <div className="flex">
                  {" "}
                  <span className="title tracking-tighter">Passuwaad:</span>
                  <span className="link text-red-700 font-bold line-clamp-1  ">
                    {gig.price}
                  </span>
                </div>
                <Divider />{" "}
                <div className="flex">
                  {" "}
                  <span className="title tracking-tighter">Description:</span>
                  <span className="link text-red-700 font-bold line-clamp-1 ">
                    {gig.description}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    {" "}
                    <span className="title tracking-tighter">status:</span>
                    <span className="link text-red-700 font-bold line-clamp-1 ">
                      {!gig.isTaken ? (
                        <span className="text-red-400">Not Taken</span>
                      ) : (
                        <span className="text-green-600">Taken</span>
                      )}
                    </span>
                  </div>
                  <div>
                    {" "}
                    <span className="link text-red-700 font-bold line-clamp-1 ">
                      {gig.postedBy.picture && (
                        <Image
                          src={gig.postedBy.picture}
                          alt="p"
                          width={30}
                          height={30}
                          className="w-[30px] h-[30px] rounded-full"
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Published;
