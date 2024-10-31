"use client";
import React, { useEffect, useState, cache } from "react";

import { useAuth } from "@clerk/nextjs";
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
import Gigheader from "./Gigheader";
import useStore from "@/app/zustand/useStore";
import { PropTypes } from "prop-types";

import { io } from "socket.io-client";
import { getGigs, handlebook } from "@/features/bookSlice";
import LoadingSpinner from "../LoadingSpinner";

const PublishedAndAllGigs = ({ user, apiroute }) => {
  const {
    setSearch,
    pubGigs,
    setPubGigs,
    setCreatedGigs,
    setIsbooked,
    isbooked,
  } = useStore();

  const { userId } = useAuth();
  const [typeOfGig, setTypeOfGig] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState();
  const [loadingview, setLoadingView] = useState();
  const [loadingPostId, setLoadingPostId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const [gigs, setGigs] = useState([]);

  const [socket, setNewSocket] = useState("");

  const [location, setLocation] = useState(() =>
    user?.user?.city ? user?.user?.city : "all"
  );

  let gigQuery;

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_PORT, {
      transports: ["websocket"],
    });
    setNewSocket(newSocket);

    newSocket.on("gig-booked", (updatedGig) => {
      console.log("Gig booked:", updatedGig);
      setGigs((prevGigs) =>
        prevGigs.map((gig) =>
          gig._id === updatedGig.results._id ? updatedGig.results : gig
        )
      );
      setIsbooked(updatedGig.results.isPending);
    });

    return () => {
      if (newSocket) newSocket.disconnect(); // Clean up on unmount
    };
  }, [setIsbooked]);

  useEffect(() => {
    getGigs(userId, setPubGigs, setCreatedGigs, setLoading, apiroute, cache);
  }, []);

  const router = useRouter();
  const [readmore, setReadMore] = useState();
  const [currentGig, setCurrentGig] = useState({});
  const [gigdesc, setGigdesc] = useState();
  const [loadinggig, setLoadingGig] = useState();
  const [open, setOpen] = useState();

  // Booking function it updates the isPending state ,only the logged in user access it
  const myId = user?.user?._id;

  // conditionsl styling
  const handleModal = async (gig) => {
    setLoadingId(gig?._id);
    try {
      const res = await fetch(`/api/gigs/addview/${gig?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid: myId }),
      });
      const data = await res.json();
      setOpen(true);
      setGigdesc(true);
      setCurrentGig(gig);
      console.log(data);
    } catch (error) {
      setLoadingId(null);
      console.log("error adding count for gigs", error);
    } finally {
      setLoadingId(null);
    }
  };
  const handleClose = () => {
    setOpen(false);
    console.log("close", gigdesc);
  };

  // Booking function it updates the isPending state
  const handleEditBooked = async (id) => {
    router.push(`/gigme/mygig/${id}/execute`);
  };
  const handleEdit = async (id) => {
    router.push(`/gigme/editpage/${id}/edit`);
  };
  return (
    <div className="w-[100%] h-[calc(100vh-260px)] p-2 shadow-lg mt-3">
      {" "}
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
        className="gigdisplay shadow-lg shadow-yellow-600 w-full h-[100%] p-2 overflow-y-scroll element-with-scroll"
      >
        {!loading && pubGigs?.length === 0 && <div>No Gigs to display</div>}

        {!loading && pubGigs?.length > 0 ? (
          <>
            {/* content */}
            {searchfunc(pubGigs, typeOfGig, category, gigQuery, location)
              ?.filter((pub) => pub.isTaken === false)
              ?.map((gig) => {
                return (
                  <>
                    {loadingId !== gig._id ? (
                      <div key={gig?.secret} className=" flex w-full my-3 ">
                        <div className="flex ">
                          <div
                            className="w-full text-right "
                            onClick={(ev) => {
                              ev.stopPropagation();
                              handleModal(gig);
                            }}
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
                                Object.keys(gigs).length > 0 || !gig?.isPending
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
                                Object.keys(gigs).length > 0 || !gig?.isPending
                                  ? "titler text-red-700 font-bold line-clamp-2"
                                  : "titler font-bold text-yellow-200 line-clamp-2"
                              }
                            >
                              {gig?.location}
                            </span>
                          </div>
                          {!gig.postedBy?._id.includes(myId) &&
                            !gig?.isPending && (
                              <div className="w-full text-right p-1 -my-2 ">
                                <ButtonComponent
                                  variant="destructive"
                                  classname=" h-[20px] text-[8px] m-2 font-bold"
                                  onclick={() => {
                                    setLoadingPostId(gig?._id);
                                    setTimeout(() => {
                                      // After the operation, you can handle the logic for reading the post
                                      handlebook(
                                        gig?._id,
                                        myId,
                                        socket,
                                        pubGigs,
                                        setLoading,
                                        userId,
                                        toast,
                                        router
                                      );

                                      // Reset the loading state after reading
                                      setLoadingPostId(null);
                                    }, 2000);
                                  }}
                                  title={
                                    loadingPostId === gig._id
                                      ? "Booking..."
                                      : "Book Gig"
                                  }
                                />
                              </div>
                            )}
                          {gig?.isPending &&
                            !gig.bookedBy?._id.includes(myId) && (
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
                                      : "View Booked Gig!!!"
                                  }
                                />
                              </div>
                            )}
                          {!gig?.isPending &&
                            gig.postedBy?._id.includes(myId) && (
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
                          <div className="flex  align-start">
                            {" "}
                            <>
                              {gig.isPending === true &&
                                gig.bookedBy?.clerkId === userId && (
                                  <div className="w-full text-right">
                                    <ButtonComponent
                                      variant="secondary"
                                      classname=" h-[20px] text-[8px] m-2 font-bold"
                                      onclick={() => {
                                        setLoadingPostId(gig?._id);

                                        setTimeout(() => {
                                          router.push(
                                            `/gigme/mygig/${gig?._id}/execute`
                                          );
                                          setLoadingPostId(null);
                                        }, 2000);
                                      }}
                                      title={
                                        loadingPostId === gig._id
                                          ? "viewing..."
                                          : "View Gig Details!!"
                                      }
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
                                <span
                                  className={
                                    Object.keys(gigs).length < 0 ||
                                    !gig?.isPending
                                      ? " tracking-tighter font-bold text-red-400 text-[11px] mr-1"
                                      : " tracking-tighter font-bold text-white text-[11px] mr-1"
                                  }
                                >
                                  Status:
                                </span>
                                <div className="titler text-red-700 font-bold line-clamp-1 no-underline ">
                                  {!gig?.isTaken ? (
                                    <span
                                      className={
                                        Object.keys(gigs).length > 0 ||
                                        gig?.isPending == false
                                          ? " track-tighter bg-sky-500  p-2 rounded-full text-[11px]  text-white "
                                          : ""
                                      }
                                    >
                                      {Object.keys(gigs).length < 0 ||
                                      gig?.isPending == false
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
                              {!gig?.bookedBy?.clerkId.includes(userId) && (
                                <>
                                  {Object.keys(gigs).length > 0 ||
                                    (gig?.isPending && (
                                      <h6 className="titler bg-red-700 h-[24px] font-bold whitespace-nowrap text-white p-1 flex">
                                        Not Available for now
                                      </h6>
                                    ))}
                                </>
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
                    ) : (
                      <div className="w-full h-[50px] flex justify-center items-center overflow-hidden">
                        <CircularProgress
                          size="20px"
                          className="text-white -mt-[30px] bg-gradient-to-r 
      from-red-400 to-yellow-400 via-orange-900 rounded-se-xl rounded-es-full rounded-r-full
      "
                        />
                      </div>
                    )}
                  </>
                );
              })
              .reverse()}{" "}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default PublishedAndAllGigs;

PublishedAndAllGigs.propTypes = {
  user: PropTypes.object.isRequired,
};
