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
    if (myGig?.gigs?.isPending === false && myGig?.gigs?.isTaken === false) {
      // Navigate to the execute page if both conditions are true
      router.push(`/gigme/gigs/${userId}`); // Early return to avoid the next push
    }

    // If the conditions are not met, navigate to the gigs page
  }, [myGig, router, userId]);

  const book = () => bookgig(rating, myGig, userId, router);
  const forget = () => forgetBookings(userId, myGig, socket);
  const onClick = () =>
    router.push(`/gigme/chat/${myGig?.gigs?.bookedBy?.clerkId}/${myGig?._id}`);

  const variant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const [comment, setComment] = useState("");
  return (
    <ClientOnly>
      <Box className="h-screen w-full overflow-auto bg-gray-900 p-4">
        <motion.div
          className="bg-gray-900 text-white p-8 rounded-lg shadow-lg"
          initial="initial"
          animate="animate"
          variants={variant}
        >
          {" "}
          <h6 className="text-lg font-semibold text-neutral-200 mb-2 bg-amber-800 w-full py-1 px-2 rounded-md">
            Personal Info
          </h6>
          <motion.div
            className="bg-gray-800 bg-opacity-30 p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {" "}
            <div className="text-sm text-neutral-300 space-y-3">
              <div>
                <span className="font-bold text-neutral-400">Username:</span>{" "}
                {myGig?.gigs?.bookedBy?.username}
              </div>
              <div>
                <span className="font-bold text-neutral-400">Full Name:</span>{" "}
                {myGig?.gigs?.bookedBy?.firstname}{" "}
                {myGig?.gigs?.bookedBy?.lastname}
              </div>
              <div>
                <span className="font-bold text-neutral-400">Tel No:</span>{" "}
                {myGig?.gigs?.phoneNo}
              </div>
              <div>
                <span className="font-bold text-neutral-400">City:</span>{" "}
                {myGig?.gigs?.bookedBy?.city}
              </div>
            </div>
          </motion.div>
          <Divider className="my-6 border-neutral-700" />
          <div className="flex justify-center space-x-10 w-3/4 mx-auto mt-6 border-t border-neutral-700 pt-6">
            <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
              <span className="text-purple-400 font-medium title">
                Followers
              </span>
              <p className="text-sm font-bold text-red-500 mt-1 choice">
                {myGig?.gigs?.bookedBy?.followers?.length || 0}
              </p>
            </motion.div>
            <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
              <span className="text-purple-400 font-medium title">
                Following
              </span>
              <p className="text-sm font-bold text-red-500 mt-1 font-mono ">
                {myGig?.gigs?.bookedBy?.followings?.length || 0}
              </p>
            </motion.div>
          </div>
          <Divider className="my-6 border-neutral-700" />
          <Divider
            sx={{ backgroundColor: "gray", width: "82%", margin: "auto" }}
          />
          {myGig.gigs?.isTaken && (
            <div className="w-full flex justify-between gap-4 my-8 p-2 rounded-lg shadow-md shadow-amber-600">
              {!myGig?.gigs?.isTaken ? (
                <Box className="flex flex-col p-2">
                  <h6 className="text-neutral-400 font-semibold">Rate</h6>
                  <Rating rating={rating} setRating={setRating} />
                </Box>
              ) : (
                <Box className="flex flex-col items-center p-2">
                  <h6 className="text-neutral-400 font-semibold mb-3">
                    Gig Rating
                  </h6>
                  <GigRating rating={myGig.gigs?.gigRating} />
                </Box>
              )}
              {myGig?.gigs?.bookedBy && (
                <Image
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full shadow-sm"
                  src={myGig?.gigs?.bookedBy?.picture}
                  alt="Booker profile"
                />
              )}
            </div>
          )}
          <div className="flex justify-center mt-8 space-x-6">
            {myGig.gigs?.isTaken === false ? (
              myGig.gigs?.isPending ===
              false(
                <>
                  <Button
                    variant="secondary"
                    onClick={forget}
                    disabled={loading}
                    sabled={bookloading}
                    className="w-48 h-[30px] mt-8 choice"
                  >
                    {loading ? (
                      <CircularProgress size="20px" sx={{ color: "blue" }} />
                    ) : (
                      "Cancel Booking"
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={book}
                    disabled={bookloading}
                    className="w-48 h-[30px] mt-8 choice"
                  >
                    {bookloading ? (
                      <CircularProgress size="20px" color="primary" />
                    ) : (
                      "Choose/Book Musician"
                    )}
                  </Button>
                </>
              )
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <Textarea
                  placeholder="
                  Write a review here...
              "
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full h-[80px] py-2 px-3 rounded-md shadow-md focus-within:ring-0 outline-none"
                />
                <Button
                  variant="destructive"
                  onClick={book}
                  disabled={bookloading}
                  className="w-48 h-[30px] mt-8 choice mx-auto"
                >
                  {bookloading ? (
                    <CircularProgress size="20px" color="primary" />
                  ) : (
                    "Review"
                  )}
                </Button>
              </div>
            )}
          </div>
          {hello && (
            <motion.div
              onClick={onClick}
              className="fixed bottom-12 right-6 text-blue-400 flex flex-col items-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <FaMessage size="40px" />
              <span className="text-yellow-300 title">Chat</span>
            </motion.div>
          )}
        </motion.div>
      </Box>
    </ClientOnly>
  );
};

export default Booker;
