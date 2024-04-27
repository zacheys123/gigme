"use client";
import MyFooter from "@/components/Footer";
import SkeletonUser from "@/components/SkeletonUser";
import UsersButton from "@/components/UsersButton";
import FriendsMobileNav from "@/components/mobile/FriendsMobileNav";
import MobileProfileNav from "@/components/mobile/MobileProfileNav";
import MobileSheet from "@/components/mobile/MobileSheet";
import { Button } from "@/components/ui/button";
import { updateFollowers } from "@/features/followerSlice";
import { useAuth } from "@clerk/nextjs";
import { Add } from "@mui/icons-material";
import { Box, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Footer, TextInput } from "flowbite-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
const FriendsProfilePage = () => {
  let id = JSON.parse(localStorage.getItem("user"));
  const id_ref = React.useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      id_ref.current = id;
    }
  }, [id]);
  const { search } = useParams();
  const { userId } = useAuth();
  const [userdata, setUserdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    city: "",
    instrument: "",
    experience: "",
    date: "",
    month: "",
    year: "",
  });
  const [follows, setFollow] = useState(false);
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["frienddata"],
    queryFn: async () => {
      const res = await fetch(`/api/user/friend/${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserdata(() => {
        return {
          firstname: data?.user?.firstname,
          lastname: data?.user?.lastname,
          email: data?.user?.email,
          username: data?.user?.username,
          city: data?.user?.city,
          instrument: data?.user?.instrument,
          experience: data?.user?.experience,
          date: data?.user?.date,
          month: data?.user?.month,
          year: data?.user?.year,
        };
      });
      return data;
    },
  });
  console.log(id._id);
  const follow = (ev) => {
    ev.preventDefault();
    updateFollowers(data, id?._d, setFollow);
  };
  const unFollow = async (ev) => {
    ev.preventDefault();
    setFollow((prev) => !prev);
  };
  if (status === "pending" || isFetching) {
    <SkeletonUser />;
  }

  return (
    <div className="overflow-auto h-[calc(100vh-20px)] bg-gray-400/10 w-full flex flex-col">
      <FriendsMobileNav />
      <div className="h-[200px]">
        <Box className="flex items-center justify-around md:justify-self-auto shadow-md bg-inherit h-[200px] w-full md:h-[400px]">
          <Box className="flex gap-2 items-center">
            {data?.user?.picture && (
              <div className="h-full mt-5 flex justify-center items-center ">
                <Image
                  src={data?.user?.picture}
                  alt="profile pic"
                  width={160}
                  height={160}
                  className="h-40 rounded-full"
                />
              </div>
            )}{" "}
            <div className="flex flex-col gap-4 h-full ">
              <div>
                <h3 className="h1 ml-3 text-slate-700/60">
                  {data?.user?.firstname} {data?.user?.lastname}
                </h3>{" "}
                <h3 className="font-mono ml-3 text-slate-700/50">
                  {data?.user?.email}
                </h3>
              </div>
              <div className="md:hidden flex items-center justify-center">
                {!follows ? (
                  <Button
                    variant="primary"
                    onClick={follow}
                    className=" text-[13px]"
                  >
                    GigFollow <Add />
                  </Button>
                ) : (
                  <Button
                    variant="closed"
                    onClick={unFollow}
                    className=" text-[13px] flex items-center"
                  >
                    GigUnFollow <IoCheckmarkDone size="20px" />
                  </Button>
                )}
              </div>
            </div>
          </Box>
          <div className="hidden md:flex md:flex-col ">
            {follows ? (
              <Button
                type="button"
                variant="primary"
                onClick={follow}
                className=" text-base"
              >
                GigFollow <Add />
              </Button>
            ) : (
              <Button variant="closed" onClick={follow} className=" text-base">
                GigUnFollow <IoCheckmarkDone size="30px" />
              </Button>
            )}
          </div>
        </Box>
      </div>
      {/* Body CodeGoes Here */}
      <div className="flex items-center justify-between shadow-md">
        {" "}
        <h2 className="font-bold text-orange-400/90 m-3 flex flex-col items-center ">
          Followers{" "}
          <span>
            {data?.user?.followers?.length < 1 ||
            data?.user?.followers?.length === 0 ||
            !data?.user?.followers?.length
              ? 0
              : data?.user?.followers?.length}
          </span>
        </h2>
        <h2 className="font-bold text-green-600/90 m-3 flex flex-col items-center ">
          Posts <span>20</span>
        </h2>{" "}
        <h2 className="font-bold text-purple-600/90 m-3 flex flex-col items-center ">
          Following <span>30</span>
        </h2>
      </div>
      <Divider />
      <div className="mt-5 flex-grow flex flex-col gap-2 bg-gray-300/70">
        {follow && (
          <div className="cursor-pointer w-[100px] tracking-tighter absolute p-2 z-50 right-0 bottom-44 m-2 rounded-b-lg rounded-tr-xl shadow-xl  rounded-r-xl bg-slate-600/40 hover:bg-gray-300/50">
            <h3 className="flex gap-2 items-center">
              <span className="font-bold text-orange-100 font-mono text-[16px]">
                Say Hi
              </span>
              <span className="text-[19px]">🖐</span>
            </h3>
          </div>
        )}
        <TextInput
          disabled
          type="text"
          className="w-[330px] mx-auto mt-4"
          placeholder="firstname"
          value={userdata?.firstname}
        />
        <TextInput
          disabled
          type="text"
          className="w-[330px] mx-auto mt-4"
          placeholder="lastname"
          value={userdata?.lastname}
        />
        <TextInput
          disabled
          type="text"
          className="w-[330px] mx-auto mt-4"
          placeholder="Email address"
          value={userdata?.email}
        />
        <TextInput
          disabled
          type="text"
          className="w-[330px] mx-auto mt-4"
          placeholder="username"
          value={userdata?.username}
        />{" "}
        <TextInput
          disabled
          type="text"
          className="w-[330px] mx-auto mt-4"
          placeholder="City"
          value={userdata?.city}
        />
        <TextInput
          disabled
          type="text"
          className="w-[330px] mx-auto mt-4"
          placeholder="instrument"
          value={userdata?.instrument}
        />{" "}
        <TextInput
          disabled
          type="text"
          className="w-[330px] mx-auto mt-4"
          placeholder="experience"
          value={userdata?.experience}
        />
        <TextInput
          disabled
          type="text"
          className="w-[330px] mx-auto my-4"
          placeholder="experience"
          value={`${userdata?.date}/${userdata?.month}/${userdata?.year}`}
        />
      </div>
      {/* End of Body Code */}
      <Footer container className="hidden md:flex b-0">
        <Footer.Copyright href="/gigme/social" by="GigMeup™" year={2022} />
        <Footer.LinkGroup>
          <Footer.Link href="/gigme/about">About</Footer.Link>
          <Footer.Link href="/gigme/privacy">Privacy Policy</Footer.Link>
          <Footer.Link href="/gigme/licencing">Licensing</Footer.Link>
          <Footer.Link href="/gigme/contact">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
};

export default FriendsProfilePage;
