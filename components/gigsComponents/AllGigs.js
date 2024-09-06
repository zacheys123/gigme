"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { CircularProgress, Divider } from "@mui/material";
import { classing, searchfunc } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import GigDescription from "./GigDescription";
import { Fullscreen } from "lucide-react";
import Gigheader from "./Gigheader";
import useStore from "@/app/zustand/useStore";
import { PropTypes } from "prop-types";
const AllGigs = ({ user }) => {
  const { userId } = useAuth();
  const [typeOfGig, setTypeOfGig] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState();
  const [location, setLocation] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();

  const [allGigs, setAllGigs] = useState([]);
  let currentUser = user?.user?._id;
  const getGigs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gigs/allgigs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data?.gigs);
      setAllGigs(data?.gigs);
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
  const router = useRouter();
  const [readmore, setReadMore] = useState();
  const [currentGig, setCurrentGig] = useState({});
  const [gigdesc, setGigdesc] = useState();
  const [open, setOpen] = useState();
  // Booking function it updates the isPending state
  const handleBook = async (id) => {
    // update the isPending state
    try {
      const res = await fetch(`/api/gigs/bookgig/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: user?.user?._id,
          currentId: currentUser,
        }),
      });
      const data = await res.json();
      console.log(data);

      router.push(`/gigme/mygig/${id}/execute`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(category);
  let gigQuery;
  // conditionsl styling
  // const handleModal = (gig) => {
  //   setOpen(true);
  //   setGigdesc(true);
  //   setCurrentGig(gig);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  //   console.log("close", gigdesc);
  // };
  const handleEditBooked = async (id) => {
    router.push(`/gigme/mygig/${id}/execute`);
  };
  const { setSearch } = useStore();
  return (
    <div className="w-full h-[calc(100vh-260px)] p-2 shadow-sm mt-3">
      {/* {!gigdesc && (
        <GigDescription
          gig={currentGig}
          open={open}
          handleClose={handleClose}
        />
      )} */}
      <Gigheader
        typeOfGig={typeOfGig}
        setTypeOfGig={setTypeOfGig}
        category={category}
        setCategory={setCategory}
        gigQuery={gigQuery}
      />
      <Divider sx={{ backgroundColor: "gray" }} />

      <br />
      <div
        onClick={() => setSearch(false)}
        className="gigdisplay shadow-lg shadow-green-700 w-full h-[100%] overflow-y-scroll element-with-scroll"
      >
        {loading && allGigs?.length === 0 && <div>No Gigs to display</div>}
        {!loading && allGigs?.length > 0 ? (
          <>
            {/* content */}
            {searchfunc(allGigs, typeOfGig, category, gigQuery)
              ?.filter((pub) => {
                return pub.isTaken === false;
              })
              .map((gig) => {
                return (
                  <div
                    key={gig?.secret}
                    className="p-1 flex w-full mt-3 "
                    onClick={() => {
                      if (gig?.bookedBy?.clerkId === userId) {
                        router.push(`/gigme/mygig/${gig?._id}/execute`);
                      }
                    }}
                  >
                    <div className="rounded-full w-[30px] h-[30px] bg-green-800"></div>
                    <div className={classing(gig, readmore)}>
                      <div className="flex">
                        {" "}
                        <span className="gigtitle text-blue-500 font-bold tracking-tighter">
                          Gig Type:
                        </span>
                        <span
                          className={
                            !gig?.isPending
                              ? "titler text-red-700 font-bold"
                              : "titler font-bold text-yellow-200"
                          }
                        >
                          {gig?.bussinesscat}
                        </span>
                      </div>
                      <div className="flex ">
                        {" "}
                        <span className="gigtitle text-blue-500 font-bold">
                          Gig title:
                        </span>
                        <span
                          className={
                            !gig?.isPending
                              ? "titler text-red-700 font-bold"
                              : "titler font-bold text-yellow-200"
                          }
                        >
                          {gig?.title}
                        </span>
                      </div>
                      <div className="flex">
                        {" "}
                        <span className="gigtitle text-blue-500 font-bold tracking-tighter">
                          Location:
                        </span>
                        <span
                          className={
                            !gig?.isPending
                              ? "titler text-red-700 font-bold line-clamp-2"
                              : "titler font-bold text-yellow-200 line-clamp-2"
                          }
                        >
                          {gig?.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between align-start">
                        {" "}
                        {/* <div
                          className="w-full text-right "
                          onClick={() => handleModal(gig)}
                        >
                          <Fullscreen />
                        </div> */}
                        <>
                          {!gig?.postedBy?.clerkId.includes(userId)
                            ? !gig?.isPending && (
                                <div className="w-full text-right">
                                  <Button
                                    variant="destructive"
                                    className="p-1 h-[25px] text-[10px] m-2 "
                                    onClick={() => handleBook(gig?._id)}
                                  >
                                    Book Now!!!
                                  </Button>
                                </div>
                              )
                            : ""}
                          {gig?.postedBy?.clerkId.includes(userId)
                            ? gig?.isPending && (
                                <div className="w-full text-right">
                                  <Button
                                    variant="primary"
                                    className="p-1 h-[25px] text-[10px] m-2 "
                                    onClick={() => handleEditBooked(gig?._id)}
                                  >
                                    View Booked Gig!!!
                                  </Button>
                                </div>
                              )
                            : ""}
                        </>
                      </div>
                      <Divider />{" "}
                      <div className="flex justify-between items-center mt-2">
                        <div
                          className={
                            gig?.isPending ? " flex " : "flex-1 w-[80%]"
                          }
                        >
                          {" "}
                          <div className=" w-[80%] flex">
                            <span className="gigtitle text-blue-500 font-bold tracking-tighter">
                              Status:
                            </span>
                            <div className="giglink text-red-700 font-bold line-clamp-1 no-underline ">
                              {!gig?.isTaken ? (
                                <span
                                  className={
                                    gig?.isPending == false
                                      ? " track-tighter bg-sky-500  p-2 rounded-full text-[11px]  text-white "
                                      : ""
                                  }
                                >
                                  {gig?.isPending == false ? "Avaliable" : ""}
                                </span>
                              ) : (
                                <span className=" bg-green-500 p-2 rounded-full text-[11px]  text-white">
                                  Taken
                                </span>
                              )}
                            </div>
                          </div>
                          {gig?.isPending && (
                            <h6 className="giglink bg-red-700 h-[24px] font-bold whitespace-nowrap text-white rounded-bl-xl p-1 flex">
                              Not Available for now
                            </h6>
                          )}
                        </div>
                        <div>
                          {" "}
                          <span className="giglink text-red-700 font-bold line-clamp-1 ">
                            {gig?.postedBy?.picture && (
                              <Image
                                src={gig?.postedBy?.picture}
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
              })
              .reverse()}
          </>
        ) : (
          <div className="h-[calc(75vh-150px)] w-full flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              {" "}
              <h6 className="gigtitle  font-bold text-white">
                loading gigs...
              </h6>
              <CircularProgress size="15px" sx={{ color: "white" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGigs;
