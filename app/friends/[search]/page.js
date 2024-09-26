"use client";
import ClientOnly from "@/app/ClientOnly";
import { useGlobalContext } from "@/app/Context/store";
import useStore from "@/app/zustand/useStore";
import MyFooter from "@/components/Footer";
import LogoutComponent from "@/components/LogoutComponent";
import SkeletonUser from "@/components/SkeletonUser";
import UserModal from "@/components/UserModal";
import UsersButton from "@/components/UsersButton";

import FriendsMobileNav from "@/components/mobile/FriendsMobileNav";

import MobileSheet from "@/components/mobile/MobileSheet";
import { Button } from "@/components/ui/button";
import {
  unFollower,
  unFollowing,
  updateFollowers,
  updateFollowing,
} from "@/features/followerSlice";
import { useAuth } from "@clerk/nextjs";
import { Add } from "@mui/icons-material";
import { Box, CircularProgress, Divider, Input } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Footer } from "flowbite-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
const FriendsProfilePage = () => {
  const router = useRouter();
  const { logout } = useStore();
  const {
    userState: { loading },
    setUserState,
  } = useGlobalContext();
  let id = JSON.parse(localStorage.getItem("user"));
  const id_ref = React.useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      id_ref.current = id;
    }
  }, [id]);
  const { search } = useParams();
  const { isLoaded, userId } = useAuth();
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
  const [refetch, setRefetch] = useState(false);

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

  // Force refresh the page

  const checkFollow = useCallback(() => {
    if (data?.user?.followers.includes(id._id)) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [data?.user?.followers, id._id]);
  useEffect(() => {
    if (id) {
      checkFollow();
    }
  }, [data, id, checkFollow]);
  const follow = (ev) => {
    ev.preventDefault();
    if (id) {
      updateFollowers(
        data,
        id?._id,
        setFollow,
        setRefetch,
        setUserState,
        router
      );
      updateFollowing(
        data,
        id?._id,
        setFollow,
        setRefetch,
        setUserState,
        router
      );
    }
  };
  const unFollow = async (ev) => {
    ev.preventDefault();
    unFollower(data, id?._id, setRefetch, setFollow, setUserState, router);
    unFollowing(data, id?._id, setRefetch, setFollow, setUserState, router);
  };

  const greeting = data?.user?.followers.includes(id._id);
  if (status === "pending" || isFetching) {
    <SkeletonUser />;
  }

  if (!isLoaded && !userId) {
    return (
      <div className="h-screen w-full">
        <div className="flex justify-center items-center h-screen flex-col">
          <CircularProgress size="100px" />
          <span className="mt-2 text-2xl font-bold">
            <CircularProgress size="16px" sx={{ color: "white" }} />
          </span>
        </div>
      </div>
    );
  }
  return (
    <ClientOnly>
      <UserModal />
      <div className="overflow-x-hidden  md:overflow-y-auto h-screen bg-gray-800 md:bg-neutral-700 w-full flex flex-col">
        <FriendsMobileNav />
        <div className="h-[200px] md:hidden">
          <Box className="flex items-center justify-around shadow-md bg-inherit  h-[200px] w-full md:h-[400px]">
            <Box className="flex gap-2 items-center md:flex-col">
              {" "}
              {data?.user?.picture && (
                <div className="h-full mt-5 flex justify-center items-center ">
                  <Image
                    src={data?.user?.picture}
                    alt="profile pic"
                    width={100}
                    height={100}
                    className="h-[100px] w-[100px] rounded-full"
                  />
                </div>
              )}{" "}
              <div className="flex flex-col gap-4 h-full ">
                <div>
                  <h3 className=" ml-3 text-white">
                    {data?.user?.firstname} {data?.user?.lastname}
                  </h3>{" "}
                  <h3 className="font-mono ml-3 text-slate-300 text-[13px]">
                    {data?.user?.email}
                  </h3>
                </div>

                {!loading ? (
                  <div className="md:hidden flex items-center justify-center">
                    {loading || !data?.user?.followers.includes(id._id) ? (
                      <Button
                        disabled={loading}
                        variant="primary"
                        onClick={follow}
                        className="text-[11px] text-[lightgray] h-[23px] p-2"
                      >
                        GigFollow <Add size="12px" sx={{ fontSize: "16px" }} />
                      </Button>
                    ) : (
                      <Button
                        disabled={loading}
                        variant="closed"
                        onClick={unFollow}
                        className=" text-[13px] flex items-center  text-[lightgray] title"
                      >
                        GigUnFollow <IoCheckmarkDone size="20px" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button className="bg-gray-700/40">
                    {" "}
                    <CircularProgress
                      className="text-center w-full"
                      size="18px"
                    />
                  </Button>
                )}
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
                <Button
                  variant="closed"
                  onClick={unFollow}
                  className=" text-base"
                >
                  GigUnFollow <IoCheckmarkDone size="30px" />
                </Button>
              )}
            </div>
          </Box>
        </div>{" "}
        {/* for screens more than and equal to medium screen sizes */}
        <div className="hidden ml-[90px]  md:h-[200px] mb-[40px] md:flex items-center md:gap-[60px] xl:gap-[80px] w-full  md:text-white">
          {" "}
          <div className="flex items-center   ">
            {data?.user?.picture && (
              <div>
                <Image
                  src={data?.user?.picture}
                  alt="profile pic"
                  width={160}
                  height={160}
                  className="h-[160px] rounded-full md:h-[160px] md:w-[160px] xl:h-[160px] xl:w-[160px] "
                />
              </div>
            )}
            <div className="flex flex-col gap-2 h-full ">
              <h3 className="h1 ml-3 text-slate-200/60 md:text-[28px] xl:text-[37px]">
                {data?.user?.firstname} {data?.user?.lastname}
              </h3>{" "}
              <h3 className="font-mono ml-3 text-slate-400/50 md:text-[18px] xl:text-[27px]">
                {data?.user?.email}
              </h3>
            </div>
            {/* <FriendInfo data={data} /> */}
          </div>
          {/*  */}
          {!loading ? (
            <div className="hidden md:flex md:flex-col ">
              {!follows ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={follow}
                  className=" md:text-base xl:text-2xl text-[lightgray] title"
                >
                  GigFollow <Add />
                </Button>
              ) : (
                <Button
                  variant="closed"
                  onClick={unFollow}
                  className=" md:text-base xl:text-2xl text-[lightgray] title"
                >
                  GigUnFollow <IoCheckmarkDone size="30px" />
                </Button>
              )}
            </div>
          ) : (
            <Button
              className={
                follows ? "bg-gray-300 w-[170px]" : "w-[170px] bg-blue-400"
              }
            >
              {" "}
              <CircularProgress className="text-center w-full" size="18px" />
            </Button>
          )}
          {/*  */}
        </div>
        {/* Body CodeGoes Here */}
        {!loading ? (
          <div className="flex items-center md:bg-inherit justify-around shadow-md shadow-gray-300 md:w-[700px] md:self-center">
            {" "}
            <h2 className="font-bold md:font-extrabold md:text-[15px] link xl:text-[19px] text-orange-400/90 m-3 flex flex-col items-center ">
              Followers{" "}
              <span>
                {data?.user?.followers?.length < 1 ||
                data?.user?.followers?.length === 0 ||
                !data?.user?.followers?.length
                  ? 0
                  : data?.user?.followers?.length}
              </span>
            </h2>
            <h2 className="font-bold md:font-extrabold md:text-[15px] link xl:text-[19px] text-green-600/90 m-3 flex flex-col items-center ">
              Posts{" "}
              <span>
                {" "}
                <span>
                  {data?.user?.gigPosts?.length < 1 ||
                  data?.user?.gigPosts?.length === 0 ||
                  !data?.user?.gigPosts?.length
                    ? 0
                    : data?.user?.gigPosts?.length}
                </span>
              </span>
            </h2>{" "}
            <h2 className="font-bold md:font-extrabold md:text-[15px] link xl:text-[19px] text-purple-600/90 m-3 flex flex-col items-center ">
              Following{" "}
              <span>
                {" "}
                <span>
                  {data?.user?.followings?.length < 1 ||
                  data?.user?.followings?.length === 0 ||
                  !data?.user?.followings?.length
                    ? 0
                    : data?.user?.followings?.length}
                </span>
              </span>
            </h2>
          </div>
        ) : (
          " "
        )}
        <Divider />
        <div className="mt-5 flex-grow flex flex-col gap-2  p-2">
          {!greeting && (
            <div className="cursor-pointer w-[100px] md:w-[180px] xl:w-[230px] tracking-tighter absolute p-2 z-50 right-0 bottom-44 m-2 rounded-b-lg rounded-tr-xl shadow-xl  rounded-r-xl bg-slate-600/40 hover:bg-gray-300/50">
              <h3 className="flex gap-2  items-center">
                <span className="font-bold text-orange-100 font-mono text-[16px] md:text-[25px] xl:text-[] font-boldxl:text-[26x]">
                  Say Hi
                </span>
                <span className="text-[19px] md:text-[23px] xl:text-[28px]">
                  🖐
                </span>
              </h3>
            </div>
          )}
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-white bg-inherit border border-b-neutral-400 border-x-0 border-t-0
           font-mono mt-4 md:w-[500px] xl:w-[630px] text-base
            md:text-[25px] xl:text-[27px] font-bold "
            placeholder="firstname"
            value={userdata?.firstname}
          />
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="lastname"
            value={userdata?.lastname}
          />
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="Email address"
            value={userdata?.email}
          />
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="username"
            value={userdata?.username}
          />{" "}
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="City"
            value={userdata?.city}
          />
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="instrument"
            value={userdata?.instrument}
          />{" "}
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="experience"
            value={userdata?.experience}
          />
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 my-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[33px] font-bold "
            placeholder="experience"
            value={`${userdata?.date || "01"}/ ${userdata?.month || "01"}/ ${
              userdata?.year || "0"
            }`}
          />
        </div>
        {/* End of Body Code */}
        <Footer container className="hidden md:flex bottom-0 absolute">
          <Footer.Copyright href="/gigme/social" by="GigMeup™" year={2022} />
        </Footer>
        {/* <Footer container className="hidden md:flex bottom-0 absolute">
          <Footer.Copyright href="/gigme/social" by="GigMeup™" year={2022} />
          <Footer.LinkGroup className="flex justify-evenly">
            <Footer.Link className="mx-2" href="/gigme/about">
              About
            </Footer.Link>
            <Footer.Link className="mx-2" href="/gigme/privacy">
              Privacy Policy
            </Footer.Link>
            <Footer.Link className="mx-2" href="/gigme/licencing">
              Licensing
            </Footer.Link>
            <Footer.Link className="mx-2" href="/gigme/contact">
              Contact
            </Footer.Link>
          </Footer.LinkGroup>
        </Footer> */}
      </div>
    </ClientOnly>
  );
};

export default FriendsProfilePage;
