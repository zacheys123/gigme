"use client";
import { Box, CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../ButtonComponent";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";
import { handlebook } from "@/features/bookSlice";
import useSocket from "@/hooks/useSocket";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner";

const GigData = ({ booker, posted, gig }) => {
  const { userId } = useAuth();
  const router = useRouter();
  console.log(gig);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const [loadingPostId, setLoadingPostId] = useState(null);
  const { user } = useCurrentUser(userId);

  const [showOffer, setShowOffer] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (gig?.isPending === false) {
      router.push(`/gigme/gigs/${userId}`);
    }
  }, [gig.isPending, router, userId]);

  useEffect(() => {
    // Show the div after 4000ms
    const showTimeout = setTimeout(() => {
      setShowOffer(true);
      // Hide the div after 3000ms from showing
      setTimeout(() => setShowOffer(false), 9000);
    }, 2000);

    return () => {
      clearTimeout(showTimeout);
    };
  }, []);
  const myId = user?.user?.id;
  const bookGig = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/gigs/bookgig/${gig?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: myId,
        }),
      });
      const data = await res.json();

      if (data.gigstatus === "true") {
        toast.success("Booked the gig successfully");

        router.back();
      } else {
        toast.error(data.message);
        router.push(`/gigme/gigs/${userId}`);
        router.refresh();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to book the gig. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90vw] max-w-[900px] p-6 rounded-2xl bg-transparent-900 shadow-lg mx-auto -mt-8 overflow-y-auto">
      {/* One-Time Offer Message */}
      {!showOffer && (
        <div className="fixed font-mono mt-[170px] mx-auto left-1/2 transform -translate-x-1/2 px-6 py-3 bg-purple-700 text-white text-center rounded-lg shadow-lg animate-slide-in-down animate-bounce transition-opacity duration-1000 ease-in-out fade-out opacity-90">
          Offer!!!! offer!!! This is a one-time offer, so choose wisely!
        </div>
      )}
      {/* Booker Details */}
      <div className="flex flex-col bg-black bg-opacity-20 p-6 my-4 rounded-lg shadow-inner">
        <h6 className="text-neutral-200 underline mt-3 gigtitle bg-amber-700 p-2 mb-3 rounded-md">
          Your Details
        </h6>
        <Box className="flex justify-between items-center w-full h-[80px] py-4 border-b border-neutral-600">
          <div className="flex flex-col">
            <span className="text-neutral-400 ">Your Name</span>
            <span className="text-neutral-300  gigtitle">{`${booker?.firstname} ${booker?.lastname}`}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Your Email</span>
            <span className="text-neutral-300  gigtitle">{booker?.email}</span>
          </div>
        </Box>
        <Box className="flex justify-between items-center w-full h-[80px] py-4 border-b border-neutral-600">
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Your Instrument</span>
            <span className="text-neutral-300  gigtitle">
              {booker?.instrument}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Your Experience</span>
            <span className="text-neutral-300  gigtitle">
              {booker?.experience ? booker?.experience : "-"}
            </span>
          </div>
        </Box>
      </div>

      {/* Creator Details */}
      <div className="flex flex-col bg-black bg-opacity-20 p-6 my-4 rounded-lg shadow-inner">
        <h6 className="text-neutral-200 underline gigtitle bg-amber-700 p-2 mb-3 rounded-md">
          Gig Creator Details
        </h6>
        <Box className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Instrument Played</span>
            <span className="text-neutral-300  gigtitle">
              {posted?.instrument}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 title">City/State/Province</span>
            <span className="text-neutral-300  gigtitle">{posted?.city}</span>
          </div>
        </Box>
        <Box className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Phone Number</span>
            <span className="text-neutral-300  gigtitle">
              {posted?.contact || "+01 1234 545 68"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-400 title">Creator Experience</span>
            <span className="text-neutral-300  gigtitle">
              {posted?.experience || "-"}
            </span>
          </div>
        </Box>
      </div>

      {/* Gig Details */}
      <div className="flex flex-col bg-black bg-opacity-20 p-6 my-4 rounded-lg shadow-inner">
        <h6 className="text-neutral-200 underline gigtitle bg-amber-700 p-2 mb-3 rounded-md">
          Gig Details
        </h6>
        <Box className="flex flex-col gap-4">
          <div className="flex flex-col my-2">
            <span className="text-neutral-400 title">Gig Title</span>
            <span className="text-neutral-300  gigtitle">{gig?.title}</span>
          </div>
          <div className="flex flex-col my-2 border-t border-neutral-600">
            <span className="text-neutral-400 title">Description</span>
            <span className="text-neutral-300  gigtitle">
              {gig?.description}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-neutral-600 pt-4">
            <div className="flex flex-col">
              <span className="text-neutral-400 title">Pay</span>
              <span className="text-neutral-300  gigtitle">{gig?.price}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-400 title">Location</span>
              <span className="text-neutral-300  gigtitle">
                {gig?.location}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center border-t border-neutral-600 pt-4">
            <div className="flex flex-col gap-3 ">
              <div className="flex flex-col ">
                <span className="text-neutral-400  title">Git Type:</span>
                <span>{gig?.bussinesscat}</span>
              </div>
              {gig?.bussinesscat === "personal" && (
                <span className="flex">
                  <span className="title text-[13px] text-neutral-400">
                    Instrument:{" "}
                  </span>
                  {gig?.bussinesscat !== null && (
                    <h6 className="title text-yellow-300 font-bold text-[14px]">
                      {gig?.category ? gig?.category : "null"}
                    </h6>
                  )}
                </span>
              )}
              {gig?.bussinesscat === "full" && (
                <span className="flex">
                  <span className="title text-purple-700 font-bold">
                    FullBand(vocalist,instrumentalists etc){" "}
                  </span>
                </span>
              )}
              {gig?.bandCategory?.length > 1 &&
                gig?.bussinesscat === "other" && (
                  <span className="  rounded-xl">
                    {" "}
                    <span className="title text-center underline font-bold text-gray-200 ">
                      Band Selection
                    </span>
                    {gig?.bandCategory &&
                      gig?.bussinesscat === "other" &&
                      gig?.bussinesscat !== null &&
                      gig?.bandCategory.map((band, idx) => {
                        return (
                          <ul className="flex link text-neutral-200" key={idx}>
                            <li> {band}</li>
                          </ul>
                        );
                      })}
                  </span>
                )}
            </div>
          </div>
          <div className="flex flex-col border-t border-neutral-600 pt-4">
            <span className="text-neutral-400 title">Date</span>
            <span className="text-neutral-300  gigtitle">
              {new Date(gig?.date).toLocaleString("en-Us", options)}
            </span>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-neutral-400 title">Time</span>
            <span className="text-neutral-300  gigtitle">
              {gig?.time?.from} to {gig?.time?.to}
            </span>
          </div>
        </Box>
      </div>

      <ButtonComponent
        variant={"destructive"}
        classname={`h-[40px] text-[9px] my-1 font-bold max-w-[252px] transition-colors duration-200 ${
          loadingPostId
            ? "bg-red-600 opacity-75 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-700"
        }`}
        onclick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          if (!user) {
            console.log("User data is not available yet.");
            return;
          }
          setLoadingPostId(gig?._id);
          setTimeout(() => {
            setLoadingPostId(null);
            bookGig();
          }, 2000);
        }}
        title={
          loadingPostId === gig?._id ? (
            <div className="flex items-center">
              <CircularProgress
                size="14px"
                sx={{ color: "white", marginRight: "8px" }}
              />
              <div className="flex flex-col items-center gap-2">
                {" "}
                <div className="gigtitle text-white flex flex-col gap-2 items-center">
                  <CircularProgress
                    sx={{ color: "inherit" }}
                    size="10px"
                    className="text-white  bg-gradient-to-r 
      from-red-400 to-yellow-400 via-orange-900 rounded-ss-xl rounded-es-full rounded-r-full
      "
                  />
                </div>
              </div>
            </div>
          ) : (
            <span className="text-[11px]">😎 Confirm Gig</span>
          )
        }
      />
    </div>
  );
};

export default GigData;
