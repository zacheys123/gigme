"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { Box, CircularProgress, Divider } from "@mui/material";
import { classing, searchfunc } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowRight, Search } from "lucide-react";
import GigDescription from "./GigDescription";
import ButtonComponent from "../ButtonComponent";
import Gigheader from "./Gigheader";
import useStore from "@/app/zustand/useStore";
import { PropTypes } from "prop-types";

const Created = ({ user }) => {
  const {
    setSearch,
    setCreatedGigs,
    createdGigs,
    socket,
    isbooked,
    setIsbooked,
  } = useStore();
  const { userId } = useAuth();
  const [typeOfGig, setTypeOfGig] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState();
  const [location, setLocation] = useState(() =>
    user?.user?.city ? user?.user?.city : "nairobi"
  );
  const [loadingPostId, setLoadingPostId] = useState(null);
  const [gigs, setGigs] = useState();
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
  useEffect(() => {
    setGigs(createdGigs);
  }, [createdGigs]);
  const router = useRouter();
  const [readmore, setReadMore] = useState();

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

  const handleClose = () => {
    setOpen(false);
    console.log("close", gigdesc);
  };
  useEffect(() => {
    // Initialize the socket only once
    if (socket) {
      // Listen for booking updates
      socket.on("gig-booked", (updatedGig) => {
        console.log(updatedGig?.results);
        setIsbooked(updatedGig?.results?.isPending);
        toast.success(updatedGig?.message);
        setGigs((prevgigs) =>
          prevgigs.map((gig) =>
            gig._id === updatedGig?.results?._id ? updatedGig : gig
          )
        );
      });
    }
    console.log(gigs);
    return () => {
      if (socket) {
        socket.off("gig-booked"); // Clean up event listeners
      }
    };
  }, [socket]);
  return (
    <div className=" w-full h-[calc(100vh-260px)] p-2  mt-3 ">
      {gigdesc && (
        <GigDescription
          gig={currentGig}
          open={open}
          handleClose={handleClose}
        />
      )}

      <Gigheader
        typeOfGig={typeOfGig}
        setTypeOfGig={setTypeOfGig}
        category={category}
        setCategory={setCategory}
        gigQuery={gigQuery}
        location={location}
        setLocation={setLocation}
        user={user}
      />
      <Divider sx={{ backgroundColor: "gray" }} />

      <br />
      <div
        onClick={() => setSearch(false)}
        className="gigdisplay shadow-lg shadow-cyan-600 w-full h-[100%] overflow-y-scroll element-with-scroll"
      >
        {!loading &&
          (searchfunc()?.length === 0) | (searchfunc()?.length < 1) && (
            <div className="w-full h-full flex justify-center items-center -mt-[50px]">
              <h6 className="text-gray-100 font-mono">
                {" "}
                No Gigs to display/No gigs from your city
              </h6>
            </div>
          )}
        {!loading && createdGigs?.length > 0 ? (
          <>
            {/* content */}
            {searchfunc(createdGigs, typeOfGig, category, gigQuery, location)
              ?.map((gig) => {
                return (
                  <div key={gig?.secret} className="p-1 flex w-full mt-3 ">
                    <div className="rounded-full w-[30px] h-[30px] bg-green-800"></div>
                    <div className={classing(gig, readmore)}>
                      <div className="flex">
                        {" "}
                        <span className="gigtitle text-blue-500 font-boldr">
                          Gig Type:
                        </span>
                        <span
                          className={
                            !gig?.isPending || !isbooked
                              ? "titler text-red-700 font-bold"
                              : "titler font-bold text-yellow-200"
                          }
                        >
                          {gig?.bussinesscat || gigs?.bussinesscat}
                        </span>
                      </div>
                      <div className="flex ">
                        {" "}
                        <span className="gigtitle text-blue-500 font-bold">
                          Gig title:
                        </span>
                        <span
                          className={
                            !gig?.isPending || !isbooked
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
                            !gig?.isPending || !isbooked
                              ? "titler text-red-700 font-bold"
                              : "titler font-bold text-yellow-200"
                          }
                        >
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
                            variant="secondary"
                            classname=" h-[22px] text-[10px] m-2 font-bold"
                            onclick={() => {
                              setLoadingPostId(gig?._id);

                              setTimeout(() => {
                                handleEditBooked(gig?._id);
                                setLoadingPostId(null);
                              }, 2000);
                            }}
                            title={
                              loadingPostId === gig._id
                                ? "viewing....!!"
                                : "View Booked Gig Gig!!!!!!"
                            }
                          />
                        </div>
                      )}
                      {!gig?.isPending && !isbooked && (
                        <div className="w-full text-right">
                          <ButtonComponent
                            variant="destructive"
                            classname=" h-[22px] text-[10px] m-2 font-bold"
                            onclick={() => {
                              setLoadingPostId(gig?._id);

                              setTimeout(() => {
                                handleEdit(gig?._id);
                                setLoadingPostId(null);
                              }, 2000);
                            }}
                            title={
                              loadingPostId === gig._id
                                ? "editing gig..."
                                : "Edit Gig!!!!!!"
                            }
                          />
                        </div>
                      )}
                      <Divider />{" "}
                      {(!gig?.postedBy?.clerkId === userId &&
                        gig?.isPending === false) ||
                      isbooked === false ? (
                        <div className="flex justify-between items-center mt-2">
                          <div
                            className={
                              gig?.isPending || isbooked
                                ? " flex "
                                : "flex-1 w-[80%]"
                            }
                          >
                            {" "}
                            <div className=" w-[80%] flex">
                              <span className="gigtitle tracking-tighter">
                                Status:
                              </span>
                              <div className="giglink text-red-700 font-bold line-clamp-1 no-underline ">
                                {!gig?.isTaken ? (
                                  <span
                                    className={
                                      gig?.isPending == false &&
                                      isbooked === false
                                        ? " track-tighter bg-sky-500  p-2 rounded-full text-[11px]  text-white "
                                        : ""
                                    }
                                  >
                                    {gig?.isPending == false &&
                                    isbooked === false
                                      ? "Avaliable"
                                      : ""}
                                  </span>
                                ) : (
                                  <span className=" bg-green-500 p-2 rounded-full text-[11px]  text-white">
                                    Taken
                                  </span>
                                )}
                              </div>
                            </div>
                            {gig?.isTaken === false &&
                              gig?.isPending === true &&
                              isbooked === true && (
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
                      ) : (
                        <div className=" w-[80%] flex mt-1">
                          <span className="gigtitle tracking-tighter">
                            Status:
                          </span>
                          <span className="giglink text-red-700 font-bold line-clamp-1 no-underline ">
                            {!gig?.isTaken ? (
                              <span
                                className={
                                  gig?.isPending == false || isbooked === false
                                    ? " track-tighter bg-sky-500  p-2 rounded-full text-[11px]  text-white "
                                    : ""
                                }
                              >
                                {gig?.isPending == false || isbooked === false
                                  ? "Avaliable"
                                  : ""}
                              </span>
                            ) : (
                              <span className=" bg-green-500 p-2 rounded-full text-[11px]  text-white">
                                Taken
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                      {gig?.isPending === false &&
                        isbooked === false &&
                        gig?.isTaken === true && (
                          <Box
                            className="flex item-center  bg-red-300 p-2 max-w-[80%] rounded-xl mt-2 gap-3
                         whitespace-nowrap md:hover:cursor-pointer  duration-400 md:hover:max-w-[80%] hover:justify-between transition-transform hover:scale-90"
                            onClick={() => {
                              router.push(
                                `/friends/${gig?.bookedBy?.username}`
                              );
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

Created.propTypes = {
  user: PropTypes.object.isRequired,
};
