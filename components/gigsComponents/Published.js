"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { CircularProgress, Divider } from "@mui/material";
import { classing, searchfunc } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "sonner";
import GigDescription from "./GigDescription";
import { Fullscreen } from "lucide-react";
import ButtonComponent from "../ButtonComponent";
import { Search } from "@mui/icons-material";
import { motion } from "framer-motion";

const Published = ({ user }) => {
  const { userId } = useAuth();
  const [typeOfGig, setTypeOfGig] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState();
  const [loadingview, setLoadingView] = useState();
  const [loadingbook, setLoadingBook] = useState();

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
  console.log(currentUser);
  useEffect(() => {
    getGigs();
  }, []);
  const router = useRouter();
  const [readmore, setReadMore] = useState();
  const [currentGig, setCurrentGig] = useState({});
  const [gigdesc, setGigdesc] = useState();
  const [open, setOpen] = useState();

  // Booking function it updates the isPending state ,only the logged in user access it
  const handleBook = async (gig) => {
    // update the isPending state

    try {
      setLoadingBook(true);
      const res = await fetch(`/api/gigs/bookgig/${gig?._id}`, {
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
      if (data.gigstatus === "true") {
        setLoadingBook(false);
        toast.success("Booked the gig successfully");
        console.log(data);
        router.push(`/gigme/mygig/${gig?._id}/execute`);
        setLoading(false);
      } else {
        toast.error(data.message);
        router.push(`/gigme/gigs/${userId}`);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(category);
  let gigQuery;
  // conditionsl styling
  const handleModal = (gig) => {
    setOpen(true);
    setGigdesc(true);
    setCurrentGig(gig);
  };
  const handleClose = () => {
    setOpen(false);
    console.log("close", gigdesc);
  };
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
    <div className="w-full h-[calc(100vh-260px)] p-2 shadow-lg mt-3">
      {" "}
      {gigdesc && (
        <GigDescription
          gig={currentGig}
          open={open}
          handleClose={handleClose}
        />
      )}
      <div className="flex justify-between ">
        <div>
          {!search ? (
            <div
              className="bg-gray-200 rounded-full p-[3px] cursor-pointer"
              onClick={() => setSearch(true)}
            >
              <Search />
            </div>
          ) : (
            <motion.div
              className="flex gap-2 items-center bg-gray-100 p-1 rounded-full h-[40px]  w-[214px]"
              variant={variant}
            >
              <input
                placeholder="filterBy:location,time,"
                className="h-[20px] w-[165px] ml-2 text-black bg-inherit p-2 focus-within:right-0 outline-none"
                value={typeOfGig}
                onChange={(ev) => {
                  setTypeOfGig(ev.target.value);
                }}
                onKeyDown={gigQuery}
              />
              <div className="" onClick={() => setSearch(false)}>
                <Search
                  sx={{
                    color: "gray",
                  }}
                />
              </div>
            </motion.div>
          )}
        </div>
        <select
          className="mb-2 w-[80px] bg-white  h-[40px] rounded-md p-3 text-[11px]  font-mono"
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
      <Divider sx={{ backgroundColor: "gray" }} />
      <br />
      <div className="gigdisplay shadow-lg shadow-yellow-600 w-full h-[100%] overflow-y-scroll element-with-scroll">
        {!loading && pubGigs?.length === 0 && <div>No Gigs to display</div>}

        {!loading && pubGigs?.length > 0 ? (
          <>
            {/* content */}
            {searchfunc(pubGigs, typeOfGig, category, gigQuery)
              ?.filter((pub) => pub.isTaken === false)
              .map((gig) => {
                return (
                  <div key={gig?.secret} className=" flex w-full mt-3 ">
                    <div className="flex ">
                      <div
                        className="w-full text-right "
                        onClick={() => handleModal(gig)}
                      >
                        <Fullscreen color="white" />
                      </div>
                    </div>
                    <div className={classing(gig, readmore)}>
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
                        <span className="gigtitle text-blue-500 font-bold">
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
                      {!gig?.postedBy?.clerkId.includes(userId)
                        ? !gig?.isPending && (
                            <div className="w-full text-right p-1 -my-2 ">
                              {!loadingbook ? (
                                <ButtonComponent
                                  variant="default"
                                  classname="p-1 h-[25px] text-[10px] m-2 font-bold"
                                  onclick={() => handleBook(gig)}
                                  title="Book Gig"
                                />
                              ) : (
                                <ButtonComponent
                                  variant="default"
                                  classname="p-1 h-[25px] text-[10px] m-2 font-bold"
                                  title="booking..."
                                />
                              )}
                            </div>
                          )
                        : ""}
                      <div className="flex  align-start">
                        {" "}
                        <>
                          {gig?.isPending === true &&
                            gig?.bookedBy?.clerkId.includes(userId) &&
                            gig?.bookedBy?.firstname ===
                              user?.user?.firstname && (
                              <div className="w-full text-right">
                                <ButtonComponent
                                  variant=""
                                  classname="p-1 h-[25px] text-[10px] m-2 font-bold"
                                  onclick={() => {
                                    setLoading(true);
                                    setTimeout(() => {
                                      setLoadingView(false);
                                      router.push(
                                        `/gigme/mygig/${gig?._id}/execute`
                                      );
                                    }, 3000);
                                  }}
                                  title="View Gig!!"
                                  loading={loadingview}
                                  loadingtitle="viewing..."
                                />
                              </div>
                            )}
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
                            <span className="gigtitle tracking-tighter">
                              Status:
                            </span>
                            <span className="titler text-red-700 font-bold line-clamp-1 no-underline ">
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
                            </span>
                          </div>
                          {gig?.isPending && (
                            <h6 className="titler bg-red-700 h-[24px] font-bold whitespace-nowrap text-white rounded-bl-xl p-1 flex">
                              Not Available for now
                            </h6>
                          )}
                        </div>
                        <div>
                          {" "}
                          <span className="titler text-red-700 font-bold line-clamp-1 ">
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
              .reverse()}{" "}
          </>
        ) : (
          <div className="h-[calc(75vh-150px)] w-full flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              {" "}
              <h6 className="gigtitle text-white">loading gigs...</h6>
              <CircularProgress size="15px" sx={{ color: "white" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Published;
