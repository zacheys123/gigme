"use client";

import { Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CircularProgress, Divider } from "@mui/material";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ArrowBack, Message } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useForgetBookings } from "@/hooks/useForgetBookings";
import { FaMessage } from "react-icons/fa6";
import ClientOnly from "@/app/ClientOnly";
const Creator = ({ myGig }) => {
  const { userId } = useAuth();
  const { loading, forgetBookings } = useForgetBookings();
  const [creatorData, setCreatorData] = useState({
    firstname: myGig?.gigs?.postedBy?.firstname,
    lastname: myGig?.gigs?.postedBy?.lastname,
    email: myGig?.gigs?.postedBy?.email,
    username: myGig?.gigs?.postedBy?.username,
    city: myGig?.gigs?.postedBy?.city,
    followers: myGig?.gigs?.postedBy?.followers,
    location: myGig?.gigs?.location,
    followings: myGig?.gigs?.postedBy?.followings,
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

  const forget = () => {
    forgetBookings(userId, myGig);
  };
  useEffect(() => {
    setCreatorData(() => {
      return {
        firstname: myGig?.gigs?.postedBy?.firstname,
        lastname: myGig?.gigs?.postedBy?.lastname,
        email: myGig?.gigs?.postedBy?.email,
        username: myGig?.gigs?.postedBy?.username,
        city: myGig?.gigs?.postedBy?.city,
        followers: myGig?.gigs?.postedBy?.followers,
        location: myGig?.gigs?.location,
        followings: myGig?.gigs?.postedBy?.followings,
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

  const router = useRouter();
  const [hello, setHello] = useState();
  useEffect(() => {
    setTimeout(() => {
      setHello(true);
    }, 4000);
  }, []);

  const onClick = (gig) => {
    router.push(`/gigme/chat/${gig?.postedBy?.clerkId}/${gig?._id}`);
  };
  if (myGig?.gigs?.isPending === false) {
    router.push(`/gigme/gigs/${userId}`);
  }
  return (
    <ClientOnly>
      <div className="container bg-neutral-600 shadow-xl h-screen overflow-hidden w-screen p-4">
        <div className="card m-4">
          <h6 className="title text-gray-200">Personal info</h6>
          <div className="flex gap-3">
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
          <div className="flex gap-3">
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
              className=" p-4   mx-auto mt-4  text-white bg-red-800   md:text-[25px] xl:text-[28] "
              placeholder="username"
              value={creatorData?.username}
            />{" "}
          </div>
          <Input
            disabled
            type="text"
            className=" p-4 title  mx-auto mt-4  text-yellow placeholder-gray-100 bg-red-800   md:text-[25px] xl:text-[28]  "
            placeholder="City"
            value={creatorData?.city}
          />{" "}
          <div className="flex items-center justify-between w-[75%] mx-auto mt-3">
            <div className="flex flex-col items-center  title">
              <span className="text-purple-500 ">Followers</span>
              <span className="text-red-500 font-bold">
                {creatorData?.followers?.length}
              </span>
            </div>
            <div className="flex items-center flex-col  title  ">
              {" "}
              <span className="text-purple-400">Followings</span>
              <span className="text-red-500 font-bold">
                {creatorData?.followings?.length}
              </span>
            </div>
          </div>
        </div>{" "}
        <Divider
          sx={{ backgroundColor: "gray", width: "82%", margin: "auto" }}
        />
        <div className="card m-4">
          <h6 className="title text-gray-200">Gig info</h6>
          <Input
            disabled
            type="text"
            className=" p-4 title  mx-auto mt-4  text-white bg-red-800   md:text-[25px] xl:text-[28] "
            placeholder="instrument"
            value={creatorData?.title}
          />{" "}
          <Textarea
            name="description"
            style={{ resize: "none", height: "fit-content" }}
            className="min-h-[110px]  mb-2 w-full p-2  mx-auto mt-4 text-white bg-red-800 md:w-full xl:w-[full] title md:text-[25px] xl:text-[26] "
            disabled
            type="text"
            value={creatorData?.description}
          />{" "}
          <div className="flex gap-3">
            <Input
              disabled
              type="text"
              className=" p-4 title  mx-auto mt-4  text-white bg-red-800   md:text-[25px] xl:text-[28]  "
              placeholder="instrument"
              value={creatorData?.location}
            />{" "}
            <Input
              disabled
              type="text"
              className=" p-4  mx-auto my-4 text-white bg-red-800 title md:text-[25px] xl:text-[27px]  "
              placeholder="experience"
              value={`${creatorData?.date}
            
          `}
            />
          </div>
        </div>
        <div className="card m-4">
          <h6 className="title text-gray-200">Bussiness info</h6>
          <div className="flex gap-3">
            <Input
              disabled
              type="text"
              className="p-4 title  text-white bg-red-800 mx-auto my-4 md:text-[25px] xl:text-[27] "
              placeholder="instrument"
              value={creatorData?.contact}
            />{" "}
            <Input
              disabled
              type="text"
              className=" p-4 title text-white bg-red-800  mx-auto my-4 md:text-[25px] xl:text-[27]  "
              placeholder="experience"
              value={creatorData?.price}
            />
          </div>
          <h6>
            {/* <span>{creatorData?.category}</span> */}
            {creatorData?.personal && creatorData?.category === "personal" && (
              <span className="flex">
                <span className="title text-[13px] text-neutral-400">
                  Instrument:{" "}
                </span>
                {creatorData?.personal && creatorData?.personal !== null && (
                  <h6 className="title text-yellow-300 font-bold text-[14px]">
                    {creatorData?.personal}
                  </h6>
                )}
              </span>
            )}
            {!creatorData?.fullband && creatorData?.category === "full" && (
              <span className="flex">
                <span className="title text-purple-700 font-bold">
                  FullBand(vocalist,instrumentalists etc){" "}
                </span>
              </span>
            )}
            {myGig?.gigs?.bandCategory?.length > 1 &&
              myGig?.gigs?.bussinesscat === "other" && (
                <span className="  rounded-xl">
                  {" "}
                  <span className="title text-center underline font-bold text-gray-200 ">
                    Band Selection
                  </span>
                  {myGig?.gigs?.bandCategory &&
                    myGig?.gigs?.bussinesscat === "other" &&
                    creatorData?.band !== null &&
                    myGig?.gigs?.bandCategory.map((band, idx) => {
                      return (
                        <ul className="flex link text-neutral-200" key={idx}>
                          <li> {band}</li>
                        </ul>
                      );
                    })}
                </span>
              )}
          </h6>
          {hello && (
            <div
              variant={variant}
              onClick={() => onClick(myGig?.gigs)}
              className="absolute top-34  right-5"
            >
              <motion.div className=" text-blue-400   md:cursor-pointer flex flex-col">
                <FaMessage sx={{ fontSize: "40px" }} size="40px" />
                <span className="title text-yellow-300 items-end justify-end">
                  chat
                </span>
              </motion.div>{" "}
            </div>
          )}
          {/* {hello && (
          <motion.div variant={variant} className={className}>
            <Button
              onClick={() => onClick(myGig?.gigs)}
              className=" top-[350px] right-10 rounded-tl-xl rounded-br-full rounded-bl-xl"
            >
              Say Hello👋😁
            </Button>
          </motion.div>
        )} */}
        </div>
        <div className="w-[80%] mx-auto flex justify-between items-center gap-1">
          <Button
            variant="secondary"
            onClick={() => router.back()}
            className="h-[32px]  w-[90px] link"
          >
            {" "}
            <ArrowBack size="21px" sx={{ fontSize: "20px" }} />
            Go back
          </Button>
          <Button
            className="h-[32px] w-[190px] text-[13px]  -p-2 mr-6 "
            variant="secondary"
            onClick={forget}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={"16px"} sx={{ color: "blue" }} />
            ) : (
              "Undo Booking/Don't Book?"
            )}
          </Button>
        </div>
      </div>
    </ClientOnly>
  );
};
// 669a8392f01b574a0bf63255
export default Creator;
