"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { CircularProgress, Divider } from "@mui/material";
import { searchfunc } from "@/utils";
import Image from "next/image";

const Published = ({ user }) => {
  const { userId } = useAuth();
  const [typeOfGig, setTypeOfGig] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState();
  const [location, setLocation] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();

  const [pubGigs, setPubGigs] = useState([]);
  let currentUser = user?.user?._id;
  const getGigs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gigs/getpub/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data?.gigs);
      setPubGigs(data?.gigs);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getGigs();
  }, []);
  const [readmore, setReadMore] = useState();
  const normalstyling =
    "w-[440px]  p-3 bg-neutral-100  shadow-lg rounded-tl-md rounded-tr-xl rounded-br-xl rounded-bl-xl";
  const readmorestyling =
    "w-[440px] h-fit p-3 bg-neutral-100  shadow-lg rounded-tl-md rounded-tr-xl rounded-br-xl rounded-bl-xl";
  const normaldescr = "link text-red-700 font-bold line-clamp-1 ";
  const readmoredescr = "link text-red-700 font-bold line-clamp-12 ";
  return (
    <div className="w-full h-[calc(100vh-260px)] p-2 shadow-sm mt-3">
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
        {pubGigs.length < 0 && <div>No Gigs to display</div>}
        {!loading && pubGigs.length > 0 ? (
          <>
            {/* content */}
            {searchfunc(pubGigs, typeOfGig, category).map((gig) => {
              return (
                <div key={gig.secret} className="p-1 flex w-full mt-3 ">
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
                        {gig.phoneNo}
                      </span>
                    </div>
                    <div className="flex">
                      {" "}
                      <span className="title tracking-tighter">Passuwaad:</span>
                      <span className="link text-red-700 font-bold line-clamp-1  ">
                        {gig.price}
                      </span>
                    </div>
                    <div className="flex">
                      {" "}
                      <span className="title tracking-tighter">
                        Description:
                      </span>
                      <span
                        className={!readmore ? normaldescr : readmoredescr}
                        onClick={() => setReadMore((prev) => !prev)}
                      >
                        {gig.description}
                      </span>
                    </div>{" "}
                    {gig?.category && (
                      <div className="flex">
                        <span className="title">Instrument: </span>

                        {gig?.category && gig?.category !== null && (
                          <h6 className="title">{gig.category}</h6>
                        )}
                      </div>
                    )}
                    <div>
                      {" "}
                      <h6 className="title text-center underline mt-2">
                        Band Selection
                      </h6>
                      {gig?.bandCategory &&
                        gig?.bandCategory !== null &&
                        gig?.bandCategory.map((band, idx) => {
                          return (
                            <ul className="flex link" key={idx} type="disc">
                              <li> {band}</li>
                            </ul>
                          );
                        })}
                    </div>
                    <Divider />{" "}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex-1 w-[80%] flex">
                        {" "}
                        <span className="title tracking-tighter">Status:</span>
                        <span className="link text-red-700 font-bold line-clamp-1 ">
                          {!gig.isTaken ? (
                            <span className=" track-tighter bg-red-500 p-2 rounded-full text-[11px]  text-white">
                              Not Taken
                            </span>
                          ) : (
                            <span className=" bg-green-500 p-2 rounded-full text-[11px]  text-white">
                              Taken
                            </span>
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
                              width={25}
                              height={25}
                              className="w-[25px] h-[25px] rounded-full"
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="h-[calc(75vh-150px)] w-full flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              {" "}
              <h6 className="title">loading gigs...</h6>
              <CircularProgress size="15px" sxx={{ color: "white" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Published;
