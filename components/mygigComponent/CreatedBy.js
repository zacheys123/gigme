"use client";
import { Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Divider } from "@mui/material";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Chat, Preview } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useForgetBookings } from "@/hooks/useForgetBookings";
import ClientOnly from "@/app/ClientOnly";
import useStore from "@/app/zustand/useStore";
import { X } from "lucide-react";

const Creator = ({ myGig }) => {
  const { userId } = useAuth();
  const { socket } = useStore();
  const { loading, forgetBookings } = useForgetBookings();
  const router = useRouter();

  const variant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewCancel = (updatedGig) => {
      toast.error(`${updatedGig?.results?.postedBy?.firstname} canceled`);
    };

    socket.on("gig-canceled", handleNewCancel);
    return () => {
      socket.off("gig-canceled", handleNewCancel);
    };
  }, [socket]);

  const [hello, setHello] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHello(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const forget = () => forgetBookings(userId, myGig, socket);

  useEffect(() => {
    if (myGig?.gigs?.isPending === false) {
      router.push(`/gigme/gigs/${userId}`);
    }
  }, [myGig, router, userId]);

  const onClickChat = (gig) => {
    router.push(`/gigme/chat/${gig?.postedBy?.clerkId}/${gig?._id}`);
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  return (
    <ClientOnly>
      <Box className="h-screen w-full overflow-auto bg-gray-900 p-4">
        <div className="sticky top-0 bg-slate-300 w-full h-16 flex items-center px-4 shadow-lg">
          <div className="flex items-center gap-4">
            <X
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => router.back()}
            />
            <Preview className="text-gray-500" />
          </div>
          <Box className="flex flex-1 items-center justify-center">
            <h6 className="text-sm font-bold text-neutral-600">Posted By:</h6>
            <div className="ml-2">
              <h6 className="text-sm text-neutral-700">
                {`${myGig?.gigs?.postedBy?.firstname} ${myGig?.gigs?.postedBy?.lastname}`}
              </h6>
              <h6 className="text-xs text-neutral-500">
                {myGig?.gigs?.postedBy?.email}
              </h6>
            </div>
          </Box>
          <Chat
            className="text-blue-400 cursor-pointer"
            onClick={() => onClickChat(myGig?.gigs)}
          />
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={variant}
          className="bg-gray-900 text-white p-6 rounded-lg mt-6 shadow-lg"
        >
          <motion.div
            className="bg-gray-800 bg-opacity-30 p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h6 className="text-lg font-semibold mb-4">Creator Info</h6>
            <div className="space-y-3">
              <div className="text-sm font-bold text-neutral-300">
                <span className="font-bold text-neutral-400">Username:</span>{" "}
                {myGig?.gigs?.postedBy?.username}
              </div>
              <div className="text-sm font-bold text-neutral-300">
                <span className="font-bold text-neutral-400">Email:</span>{" "}
                {myGig?.gigs?.postedBy?.email}
              </div>
              <div className="text-sm text-neutral-300">
                <span className="font-bold text-neutral-400">Tel No:</span>{" "}
                {myGig?.gigs?.contact}
              </div>
            </div>
            <div className="flex justify-center space-x-10 w-3/4 mx-auto mt-6 border-t border-neutral-700 pt-6">
              <div className="text-center flex flex-col items-center bg-gray-800 bg-opacity-20 px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-purple-500 text-sm font-medium">
                  Followers
                </span>
                <span className="text-2xl font-bold text-red-500 mt-1">
                  {myGig?.gigs?.postedBy?.followers?.length || 0}
                </span>
              </div>

              <div className="text-center flex flex-col items-center bg-gray-800 bg-opacity-20 px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-purple-400 text-sm font-medium">
                  Followings
                </span>
                <span className="text-2xl font-bold text-red-500 mt-1">
                  {myGig?.gigs?.postedBy?.followings?.length || 0}
                </span>
              </div>
            </div>
          </motion.div>

          <Divider className="my-6 border-neutral-700" />

          <motion.div
            className="bg-gray-800 bg-opacity-30 p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h6 className="text-lg font-semibold mb-4">Gig Info</h6>
            <div>
              <div className="font-bold text-neutral-400 mb-2">
                {myGig?.gigs?.title}
              </div>
              <Textarea
                name="description"
                className="min-h-[110px] w-full mt-3 p-3 text-gray-100 bg-gray-900 rounded-lg"
                disabled
                value={myGig?.gigs?.description}
              />
              <div className="flex gap-6 mt-3 text-sm text-neutral-400">
                <div>{myGig?.gigs?.location}</div>
                <div>
                  {new Date(myGig?.gigs?.date).toLocaleString("en-US", options)}
                </div>
              </div>
              <div className="flex gap-6 mt-3 text-sm text-neutral-400">
                {myGig?.gigs?.time?.from} to
                {myGig?.gigs?.time?.to}
              </div>{" "}
            </div>
          </motion.div>

          <div className="flex justify-center mt-8">
            <Button
              className="h-10 w-48 text-sm"
              variant="secondary"
              onClick={forget}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size="16px" sx={{ color: "blue" }} />
              ) : (
                "Undo Booking"
              )}
            </Button>
          </div>
        </motion.div>
      </Box>
    </ClientOnly>
  );
};

export default Creator;
