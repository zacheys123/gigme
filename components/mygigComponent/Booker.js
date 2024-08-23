"use client";

import { Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Box, CircularProgress, Divider } from "@mui/material";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Rating from "./Rating";
import GigRating from "./GigRating";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Transition from "../Transition";
import { motion } from "framer-motion";
import { useForgetBookings } from "@/hooks/useForgetBookings";
import { useBookGig } from "@/hooks/useBookGig";
import { useAuth } from "@clerk/nextjs";
import { FaMessage } from "react-icons/fa6";
const Booker = ({ myGig }) => {
  const { userId } = useAuth();
  const { loading, forgetBookings } = useForgetBookings();
  const { bookloading, bookgig } = useBookGig();

  const router = useRouter();
  const [rating, setRating] = useState(0);

  const [creatorData, setCreatorData] = useState({
    firstname: myGig?.gigs?.bookedBy?.firstname,
    lastname: myGig?.gigs?.bookedBy?.lastname,
    email: myGig?.gigs?.bookedBy?.email,
    username: myGig?.gigs?.bookedBy?.username,
    city: myGig?.gigs?.bookedBy?.city,
    followers: myGig?.gigs?.bookedBy?.followers,
    location: myGig?.gigs?.location,
    followings: myGig?.gigs?.bookedBy?.followings,
    title: myGig?.gigs?.title,
    description: myGig?.gigs?.description,
    contact: myGig?.gigs?.phone,
    price: myGig?.gigs?.price,
    category: myGig?.gigs?.bussinesscat,
    band: myGig?.gigs?.bandCategory,
    personal: myGig?.gigs?.category,
    fullband: "fullband",
    date: new Date(myGig?.gigs?.date).toLocaleDateString(),
  });

  useEffect(() => {
    setCreatorData(() => {
      return {
        firstname: myGig?.gigs?.bookedBy?.firstname,
        lastname: myGig?.gigs?.bookedBy?.lastname,
        email: myGig?.gigs?.bookedBy?.email,
        username: myGig?.gigs?.bookedBy?.username,
        city: myGig?.gigs?.bookedBy?.city,
        followers: myGig?.gigs?.bookedBy?.followers,
        location: myGig?.gigs?.location,
        followings: myGig?.gigs?.bookedBy?.followings,
        title: myGig?.gigs?.title,
        description: myGig?.gigs?.description,
        contact: myGig?.gigs?.phone,
        price: myGig?.gigs?.price,
        category: myGig?.gigs?.bussinesscat,
        band: myGig?.gigs?.bandCategory,
        personal: myGig?.gigs?.category,
        fullband: "fullband",
        date: new Date(myGig?.gigs?.date).toLocaleDateString(),
      };
    });
  }, []);

  let variant = {
    initial: {
      x: ["-100px", "-50px", "-20px", "0px", "20px", "40px", "0px"],
      opacity: [-10, -7, 0],
    },
    animate: {
      x: 0,
      opacity: [-10, -7, -5, -3, 1],
    },
    transition: {
      ease: "easeInOut",
      duration: 5,
    },
  };
  let className = "";
  const [hello, setHello] = useState();
  useEffect(() => {
    setTimeout(() => {
      setHello(true);
    }, 4000);
  }, []);

  console.log(myGig);
  const book = () => {
    bookgig(rating, myGig);
  };
  const forget = () => {
    forgetBookings(userId, myGig);
  };
  const onClick = (gig) => {
    router.push(`/gigme/chat/${gig?.bookedBy?.clerkId}/${gig?._id}`);
  };
  if (myGig?.gigs?.isPending === false) {
    router.push(`/gigme/gigs/${userId}`);
  }
  return (
    <div className="container bg-neutral-600 shadow-xl h-full overflow-hidden w-full p-2 relative">
      <div className="card m-4">
        <h6 className="title text-neutral-200 text-center uppercase underline">
          <span className="text-red-500 font-bold">Title:</span>{" "}
          {myGig?.gigs?.title}
        </h6>
        <h6 className="title text-gray-200">Personal info</h6>
        <div className="flex gap-3 mb-6">
          <Input
            disabled
            type="text"
            className="title p-4  mx-auto mt-4  text-white bg-red-800  md:text-[25px] xl:text-[28px] "
            placeholder="firstname"
            value={creatorData?.firstname}
          />
          <Input
            disabled
            type="text"
            className=" p-4 title  mx-auto mt-4  text-white bg-red-800   md:text-[25px] xl:text-[28]  "
            placeholder="lastname"
            value={creatorData?.lastname}
          />
        </div>
        <div className="flex gap-3 mb-6">
          <Input
            disabled
            type="text"
            className=" p-4   mx-auto mt-4  text-white bg-red-800   md:text-[25px] xl:text-[28]  "
            placeholder="Email address"
            value={creatorData?.email}
          />
          <Input
            disabled
            type="text"
            className=" p-4   mx-auto mt-4 mb-6  text-white bg-red-800   md:text-[25px] xl:text-[28] "
            placeholder="username"
            value={creatorData?.username}
          />{" "}
        </div>
        <Input
          disabled
          type="text"
          className=" p-4 title  mx-auto my-4  text-yellow placeholder-gray-100 bg-red-800   md:text-[25px] xl:text-[28]  "
          placeholder="City"
          value={creatorData?.city}
        />{" "}
        <div className="flex items-center justify-between w-[75%] mx-auto my-8">
          <h6 className="flex flex-col items-center  title">
            <span className="text-purple-500 ">Followers</span>
            <span className="text-red-500 font-bold">
              {creatorData?.followers?.length}
            </span>
          </h6>
          <h6 className="flex items-center flex-col  title  ">
            {" "}
            <span className="text-purple-400">Followings</span>
            <span className="text-red-500 font-bold">
              {creatorData?.followings?.length}
            </span>
          </h6>
        </div>{" "}
        <Divider
          sx={{ backgroundColor: "gray", width: "82%", margin: "auto" }}
        />
        <div className="w-full flex  justify-between gap-2 my-8 rounded-xl shadow-red-400 shadow-md p-2 items-center">
          {!myGig?.gigs?.isTaken ? (
            <Box className="  flex flex-col p-1 gap-1">
              <h6 className="title text-neutral-400">Rate!!!!</h6>
              <Rating rating={rating} setRating={setRating} />
            </Box>
          ) : (
            <Box className="flex flex-col gap-1 p-1">
              {myGig?.gigs?.gigRating > 0 ? (
                <h6>
                  {myGig?.gigs?.gigRating}
                  <span className="text-neutral-200 title">stars</span>
                </h6>
              ) : (
                <h6 className="text-[15px] text-neutral-200">No Rating</h6>
              )}
              <GigRating rating={myGig.gigs?.gigRating} />
            </Box>
          )}
          {myGig?.gigs?.bookedBy && (
            <Image
              width={25}
              height={25}
              className="w-[35px] h-[35px] rounded-full "
              src={myGig?.gigs?.bookedBy?.picture}
              alt={
                myGig?.gigs?.bookedBy?.firstname &&
                myGig?.gigs?.bookedBy?.firstname.split("")[0]
              }
            />
          )}{" "}
        </div>
      </div>
      {!myGig?.gigs?.isTaken && (
        <div className="w-[85%] mx-auto flex flex-col justify-between items-center gap-1 mt-[20px]">
          <div className="flex ">
            <Button
              variant="secondary"
              onClick={() => router.back()}
              className="h-[34px]  w-[90px]  sm:text-[8px]  text-[11px] md:text-[13px]"
            >
              {" "}
              <ArrowBack size="21px" sx={{ fontSize: "20px" }} />
              Go back
            </Button>{" "}
            <div>
              <Button
                className="h-[35px] w-full  -p-3 mx-6 sm:text-[8px]  text-[11px] md:text-[13px] "
                variant="secondary"
                onClick={forget}
                disabled={loading}
              >
                {!loading ? (
                  "Cancel Gig"
                ) : (
                  <CircularProgress size="13px" sx={{ color: "red" }} />
                )}
              </Button>
            </div>
          </div>{" "}
          <Button
            className="h-[45px] mt-3  w-[100%] sm:text-[8px]  text-[11px] md:text-[13px]   p-2 mx-4  whitespace-nowrap"
            variant="default"
            onClick={book}
            disabled={bookloading}
          >
            {!bookloading ? (
              "Book Gig!!/Choose Musician"
            ) : (
              <CircularProgress size="13px" sx={{ color: "red" }} />
            )}
          </Button>
        </div>
      )}
      {hello && (
        <div
          variant={variant}
          onClick={() => onClick(myGig?.gigs)}
          className="absolute top-32  right-5"
        >
          <motion.div className=" text-blue-400   md:cursor-pointer flex flex-col">
            <FaMessage sx={{ fontSize: "40px" }} size="40px" />
            <span className="title text-yellow-300 items-end justify-end">
              chat
            </span>
          </motion.div>{" "}
        </div>
      )}
    </div>
  );
};
// 669a8392f01b574a0bf63255
export default Booker;
