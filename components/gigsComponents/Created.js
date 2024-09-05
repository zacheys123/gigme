"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { Box, CircularProgress, Divider } from "@mui/material";
import { classing, searchfunc } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import GigDescription from "./GigDescription";
import ButtonComponent from "../ButtonComponent";

const Created = ({ user }) => {
  const { userId } = useAuth();
  const [typeOfGig, setTypeOfGig] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState();
  const [location, setLocation] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();

  const [createdGigs, setCreatedGigs] = useState([]);
  let currentUser = user?.user?._id;
  const getGigs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gigs/getcreated/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data?.gigs);
      setCreatedGigs(data?.gigs);
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
  const [ispend, setIsPending] = useState();
  const [arrow, setArrow] = useState();
  const [currentGig, setCurrentGig] = useState({});
  const [gigdesc, setGigdesc] = useState();
  const [open, setOpen] = useState();
  // Booking function it updates the isPending state
  const handleEditBooked = async (id) => {
    router.push(`/gigme/mygig/${id}/execute`);
  };
  const handleEdit = async (id) => {
    router.push(`/gigme/editpage/${id}/edit`);
  };
  console.log(createdGigs);
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
  return (
    <div className=" w-full h-[calc(100vh-260px)] p-2  mt-3 ">
      {gigdesc && (
        <GigDescription
          gig={currentGig}
          open={open}
          handleClose={handleClose}
        />
      )}
      <div className="flex justify-between ">
        <Input
          placeholder="filterBy:location,time,"
          className="h-[40px] w-[200px] text-black"
          value={typeOfGig}
          onChange={(ev) => {
            setTypeOfGig(ev.target.value);
          }}
          onKeyDown={gigQuery}
        />
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
      <div className="gigdisplay shadow-lg shadow-cyan-600 w-full h-[100%] overflow-y-scroll element-with-scroll">
        {!loading && createdGigs?.length === 0 && (
          <div className="w-full h-full flex justify-center items-center -mt-[50px]">
            <h6 className="text-gray-100 font-mono"> No Gigs to display</h6>
          </div>
        )}
        {!loading && createdGigs?.length > 0 ? (
          <>
            {/* content */}
            {searchfunc(createdGigs, typeOfGig, category, gigQuery)
              .map((gig) => {
                return (
                  <div key={gig?.secret} className="p-1 flex w-full mt-3 ">
                    <div className="rounded-full w-[30px] h-[30px] bg-green-800"></div>
                    <div className={classing(gig, readmore)}>
                      <div className="flex">
                        {" "}
                        <span className="gigtitle tracking-tighter">
                          Gig Type:
                        </span>
                        <span className="giglink text-red-700 font-bold line-clamp-1  ">
                          {gig?.bussinesscat}
                        </span>
                      </div>
                      <div className="flex ">
                        {" "}
                        <span className="gigtitle">Gig title:</span>
                        <span className="giglink text-red-700 font-bold">
                          {gig?.title}
                        </span>
                      </div>
                      <div className="flex">
                        {" "}
                        <span className="gigtitle tracking-tighter">
                          Location:
                        </span>
                        <span className="giglink text-red-700 font-bold line-clamp-2  ">
                          {gig?.location}
                        </span>
                      </div>
                      {/* you cannot book your own gigs yet */}
                      {/* {!gig?.isPending && (
                        <div className="w-full text-right">
                          <Button
                            variant="primary"
                            className="p-1 h-[25px] text-[10px] m-2 "
                            onClick={() => handleBook(gig?._id)}
                          >
                            Book Now!!!
                          </Button>
                        </div>
                      )} */}
                      {gig?.isPending && (
                        <div className="w-full text-right">
                          <ButtonComponent
                            variant="default"
                            classname="p-1 h-[25px] text-[10px] m-2 font-bold"
                            onclick={() => handleEditBooked(gig?._id)}
                            title=" View Booked Gig!!!"
                          />
                        </div>
                      )}
                      {!gig?.isPending && !gig?.isTaken && (
                        <div className="w-full text-right">
                          <ButtonComponent
                            variant="default"
                            classname="p-1 h-[25px] text-[10px] m-2 font-bold"
                            onclick={() => handleEdit(gig?._id)}
                            title="Edit Gig!!!!"
                          />
                        </div>
                      )}
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
                            <span className="giglink text-red-700 font-bold line-clamp-1 no-underline ">
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
                      {gig?.isPending === false && gig?.isTaken === true && (
                        <Box
                          className="flex item-center  bg-red-300 p-2 max-w-[80%] rounded-xl mt-2 gap-3
                         whitespace-nowrap md:hover:cursor-pointer  duration-400 md:hover:max-w-[80%] hover:justify-between transition-transform hover:scale-90"
                          onClick={() => {
                            router.push(`/friends/${gig?.bookedBy?.username}`);
                          }}
                          // onMouseOver={() => setArrow(true)}
                          // onMouseLeave={() => setArrow(false)}
                        >
                          <div className="flex gap-2">
                            <h6 className="font-mono text-[12px]">
                              Who Booked?!!{" "}
                            </h6>
                            <span className="giglink font-bold text-blue-500">
                              {gig?.bookedBy?.firstname}
                            </span>
                          </div>

                          <div className="">
                            <ArrowRight
                              sx={{
                                fontSize: "14px",
                                opacity: 0.5,
                              }}
                              color="grey"
                              size="17px"
                            />
                          </div>
                        </Box>
                      )}
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
              <h6 className="gigtitle text-white">loading gigs...</h6>
              <CircularProgress size="15px" sx={{ color: "white" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Created;
