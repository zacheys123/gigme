"use client";

import { Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CircularProgress, Divider } from "@mui/material";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Creator = ({ myGig }) => {
  const { userId } = useAuth();
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
  console.log(myGig);
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
  const route = useRouter();
  const [loading, setLoading] = useState();
  const forgetBooking = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/gigs/cancelgig/${myGig?.gigs?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to cancel the gig");
      }
      const data = await response.json();
      if (data.gigstatus === "true") {
        toast.success("Cancelled the gig successfully");
        console.log(data);
        route.push(`/gigme/gigs/${userId}`);
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error canceling the gig:", error.message);
    }
  };
  return (
    <div className="container bg-neutral-600 shadow-xl h-full overflow-hidden w-full p-2">
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
        </div>
      </div>{" "}
      <Divider sx={{ backgroundColor: "gray", width: "82%", margin: "auto" }} />
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
            <div className="flex">
              <span className="title text-[13px] text-neutral-400">
                Instrument:{" "}
              </span>

              {creatorData?.personal && creatorData?.personal !== null && (
                <h6 className="title text-yellow-300 font-bold text-[14px]">
                  {creatorData?.personal}
                </h6>
              )}
            </div>
          )}
          {!creatorData?.fullband && creatorData?.category === "full" && (
            <div className="flex">
              <span className="title text-purple-700 font-bold">
                FullBand(vocalist,instrumentalists etc){" "}
              </span>
            </div>
          )}
          {creatorData?.band?.length > 1 &&
            creatorData?.category !== "full" && (
              <div>
                {" "}
                <h6 className="title text-center underline mt-2">
                  Band Selection
                </h6>
                {creatorData?.band &&
                  creatorData?.bussinesscat === "other" &&
                  creatorData?.band !== null &&
                  creatorData?.band.map((band, idx) => {
                    return (
                      <ul className="flex link" key={idx} type="disc">
                        <li> {band}</li>
                      </ul>
                    );
                  })}
              </div>
            )}
        </h6>
      </div>
      <div className="w-full text-right">
        <Button
          className="h-[45px] w-[120px] text-[13px]  -p-3 mr-6 "
          variant="primary"
          onClick={forgetBooking}
        >
          {loading ? (
            <CircularProgress size={"16px"} sx={{ color: "white" }} />
          ) : (
            "Forget Booking"
          )}
        </Button>
      </div>
      <Button className="absolute top-[550px] right-10 rounded-tl-xl roundebr-full rounde-bl-xl">
        Say Hello👋😁
      </Button>
    </div>
  );
};
// 669a8392f01b574a0bf63255
export default Creator;
