"use client";

import { Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Divider } from "@mui/material";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForgetBookings } from "@/hooks/useForgetBookings";
import { useBookGig } from "@/hooks/useBookGig";
import { useAuth } from "@clerk/nextjs";
import { FaMessage } from "react-icons/fa6";
import Image from "next/image";
import Rating from "./Rating";
import GigRating from "./GigRating";
import ClientOnly from "@/app/ClientOnly";
import useStore from "@/app/zustand/useStore";
import { toast } from "sonner";

const Booker = ({ myGig }) => {
  const { userId } = useAuth();
  const { socket, isbooked, setIsbooked } = useStore();
  const { loading, forgetBookings } = useForgetBookings();
  const { bookloading, bookgig } = useBookGig();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hello, setHello] = useState(false);

  useEffect(() => {
    if (socket) {
      const handleNewCancel = (updatedGig) => {
        setIsbooked(updatedGig.results?.isPending);
        toast.error(`${updatedGig?.results?.bookedBy?.firstname} canceled`);
      };
      socket.on("gig-canceled", handleNewCancel);
      return () => socket.off("gig-canceled", handleNewCancel);
    }
  }, [socket]);

  useEffect(() => {
    setTimeout(() => setHello(true), 2000);
  }, []);

  useEffect(() => {
    if (myGig?.gigs?.isPending === false) {
      router.push(`/gigme/gigs/${userId}`);
    }
  }, [isbooked, myGig, router, userId]);

  const book = () => bookgig(rating, myGig, userId);
  const forget = () => forgetBookings(userId, myGig, socket);
  const onClick = () =>
    router.push(`/gigme/chat/${myGig?.gigs?.bookedBy?.clerkId}/${myGig?._id}`);

  return (
    <ClientOnly>
      <Box className="h-full w-full bg-gray-900">
        <div className="h-full overflow-hidden p-6 bg-gray-800">
          <div className="card m-4 p-4 bg-gray-700 rounded-xl shadow-lg">
            <h3 className="text-center text-xl font-bold text-purple-500 mb-2">
              Gig Details
            </h3>
            <motion.div
              className="bg-gray-900 p-6 rounded-lg shadow-md mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h6 className="text-lg font-semibold mb-4 text-neutral-200">
                Personal Info
              </h6>
              <div className="space-y-3 text-sm text-neutral-300">
                <div>
                  <span className="font-bold">Username:</span>{" "}
                  {myGig?.gigs?.bookedBy?.username}
                </div>
                <div>
                  <span className="font-bold">FullName:</span>{" "}
                  {myGig?.gigs?.bookedBy?.firstname}{" "}
                  {myGig?.gigs?.bookedBy?.lastname}
                </div>
                <div>
                  <span className="font-bold">Tel no:</span>{" "}
                  {myGig?.gigs?.phoneNo}
                </div>
                <div>
                  <span className="font-bold">City/State/Town:</span>{" "}
                  {myGig?.gigs?.bookedBy?.city}
                </div>
              </div>
            </motion.div>
            <div className="flex justify-around items-center py-4 text-neutral-300">
              <div className="text-center">
                <span className="text-purple-400 font-semibold">Followers</span>
                <p className="text-lg text-red-500">
                  {myGig?.gigs?.bookedBy?.followers?.length}
                </p>
              </div>
              <div className="text-center">
                <span className="text-purple-400 font-semibold">Following</span>
                <p className="text-lg text-red-500">
                  {myGig?.gigs?.bookedBy?.followings?.length}
                </p>
              </div>
            </div>
            <Divider
              sx={{ backgroundColor: "gray", width: "82%", margin: "auto" }}
            />
            <div className="w-full flex justify-between gap-2 my-8 rounded-xl shadow-md p-2 items-center">
              {!myGig?.gigs?.isTaken ? (
                <Box className="flex flex-col p-2">
                  <h6 className="text-neutral-400 font-semibold">Rate</h6>
                  <Rating rating={rating} setRating={setRating} />
                </Box>
              ) : (
                <Box className="flex flex-col items-center p-2">
                  <h6 className="text-neutral-400 font-semibold">Gig Rating</h6>
                  <GigRating rating={myGig.gigs?.gigRating} />
                </Box>
              )}
              {myGig?.gigs?.bookedBy && (
                <Image
                  width={50}
                  height={50}
                  className="w-[40px] h-[40px] rounded-full"
                  src={myGig?.gigs?.bookedBy?.picture}
                  alt="Booker profile"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-6">
            <Button
              variant="secondary"
              onClick={() => router.back()}
              className="w-[90%] mb-2"
            >
              Go back
            </Button>
            <Button
              variant="secondary"
              onClick={forget}
              disabled={loading}
              className="w-[90%]"
            >
              {!loading ? (
                "Cancel Gig"
              ) : (
                <CircularProgress size="20px" color="secondary" />
              )}
            </Button>
            <Button
              variant="primary"
              onClick={book}
              disabled={bookloading}
              className="w-[90%] mt-2"
            >
              {!bookloading ? (
                "Book Gig / Choose Musician"
              ) : (
                <CircularProgress size="20px" color="primary" />
              )}
            </Button>
          </div>
          {hello && (
            <motion.div
              onClick={onClick}
              className="fixed bottom-12 right-6 text-blue-400 flex flex-col items-center cursor-pointer"
            >
              <FaMessage size="30px" />
              <span className="text-yellow-300">Chat</span>
            </motion.div>
          )}
        </div>
      </Box>
    </ClientOnly>
  );
};

export default Booker;
