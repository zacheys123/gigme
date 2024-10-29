"use client";
import ClientOnly from "@/app/ClientOnly";
import { useGlobalContext } from "@/app/Context/store";

import MyFooter from "@/components/Footer";
import LogoutComponent from "@/components/LogoutComponent";
import SkeletonUser from "@/components/SkeletonUser";
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
import { Footer } from "flowbite-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import UserModal from "../modals/UserModal";
import Modal from "../modals/Modal";
import FollowersModal from "../modals/FriendFollowersModal";
import useStore from "@/app/zustand/useStore";
import ToolTip from "../postComponents/ToolTip";
import { Separator } from "../ui/separator";
import { getFollow, getFollowing } from "@/utils";
import ImageModal from "../ImageModal";
import { motion } from "framer-motion";
const FriendsComponent = ({ friend }) => {
  console.log(friend);
  const router = useRouter();
  const { setFollowers, follows, setFollow, setRefetch } = useStore();
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

  const [followersLength, setFollowersLength] = useState(
    friend?.followers.length > 0 && friend?.followers.length
  );
  const [followingLength, setFollowingLength] = useState(
    friend?.followers.length > 0 && friend?.followers.length
  );

  const isFollowing = friend?.followers?.includes(id?._id);
  const showFollow = !follows || !isFollowing;

  useEffect(() => {
    setUserdata(() => {
      return {
        firstname: friend?.firstname,
        lastname: friend?.lastname,
        email: friend?.email,
        username: friend?.username,
        city: friend?.city,
        instrument: friend?.instrument,
        experience: friend?.experience,
        date: friend?.date,
        month: friend?.month,
        year: friend?.year,
      };
    });
  }, []);

  // Force refresh the page

  const follow = (ev) => {
    ev.preventDefault();
    if (id) {
      updateFollowers(
        friend,
        id?._id,
        setFollow,
        setUserState,
        setFollowersLength
      );
      updateFollowing(friend, id?._id, setUserState), setFollowingLength;
    }
  };
  const unFollow = async (ev) => {
    ev.preventDefault();
    unFollower(friend, id?._id, setFollow, setUserState, setFollowersLength);
    unFollowing(friend, id?._id, setUserState, setFollowingLength);
  };

  const greeting = friend?.followers?.includes(id?._id);
  useEffect(() => {
    if (friend?.username === id?.username) {
      router.back();
    }
    return;
  }, [friend?.username, id?.username, router]);

  const [isTitle, setIsTitle] = useState(false);
  const [open, setOpen] = useState();
  const [currentPost, setCurrentPost] = useState({});
  const handleModal = (post) => {
    setIsTitle(true);
    setCurrentPost(post);
    console.log("close", isTitle);
  };

  const handleClose = () => {
    setIsTitle(false);
    console.log("close", isTitle);
  };
  return (
    <>
      <Modal width="100vw">
        <UserModal />
      </Modal>
      {isTitle && (
        <motion.div
          className="relative h-full w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="absolute inset-0 h-[100vh] w-full bg-zinc-700  opacity-90"></div>
          <div className="absolute z-10 mt-20">
            <div className="absolute  bg-neutral-400 h-[30px] w-[30px] rounded-full flex justify-center items-center cursor-pointer">
              <span
                className="text-white font-bold text-[18px] "
                onClick={handleClose}
              >
                &times;
              </span>{" "}
            </div>
            <></>
            <Image
              priority
              src={friend.picture}
              className="object-cover w-[580px] h-[580px] rounded-xl mt-[24px]"
              alt={friend.firstname.split("")[0]}
              width={200}
              height={200}
            />
          </div>
        </motion.div>
      )}{" "}
      {friend ? (
        <Modal>
          {" "}
          <FollowersModal width="260" friend={friend} />
        </Modal>
      ) : (
        <div className="w-full h-[100vh] flex justify-center items-center choice">
          loading....
        </div>
      )}
      <div className="overflow-x-hidden  md:overflow-y-auto h-screen bg-gray-800 md:bg-neutral-700 w-full flex flex-col">
        <FriendsMobileNav />
        <ToolTip id={id} />
        <div className="h-[200px] md:hidden">
          <Box className="flex items-center justify-around shadow-md bg-inherit  h-[200px] w-full md:h-[400px]">
            <Box className="flex gap-2 items-center md:flex-col">
              {" "}
              {friend?.picture && (
                <div className="h-full mt-5 flex justify-center items-center ">
                  <Image
                    src={friend?.picture}
                    alt="profile pic"
                    width={100}
                    height={100}
                    className="h-[100px] w-[100px] rounded-full"
                    onClick={() => handleModal(friend)}
                  />
                </div>
              )}{" "}
              <div className="flex flex-col gap-4 h-full ">
                <div>
                  <h3 className=" ml-3 text-white">
                    {friend?.firstname} {friend?.lastname}
                  </h3>{" "}
                  <h3 className="font-mono ml-3 text-slate-300 text-[13px]">
                    {friend?.email}
                  </h3>
                </div>

                {friend?.followers?.includes(id?._id) ? (
                  <div className="md:hidden flex items-center justify-center">
                    {!follows || !friend?.followers.includes(id?._id) ? (
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
                        className="text-[11px] text-gray-700 h-[23px] p-2 bg-gray-300"
                      >
                        GigUnFollow <IoCheckmarkDone size="20px" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="md:hidden flex items-center justify-center">
                    {!follows ? (
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
                        className="text-[11px] text-gray-700 h-[23px] p-2 bg-gray-200"
                      >
                        GigUnFollow <IoCheckmarkDone size="20px" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Box>
          </Box>
        </div>{" "}
        {/* for screens more than and equal to medium screen sizes */}
        <div className="hidden ml-[90px]  md:h-[200px] mb-[40px] md:flex items-center md:gap-[60px] xl:gap-[80px] w-full  md:text-white">
          {" "}
          <div className="flex items-center   ">
            {friend?.picture && (
              <div>
                <Image
                  src={friend?.picture}
                  alt="profile pic"
                  width={160}
                  height={160}
                  className="h-[160px] rounded-full md:h-[160px] md:w-[160px] xl:h-[160px] xl:w-[160px] "
                />
              </div>
            )}
            <div className="flex flex-col gap-2 h-full ">
              <h3 className="h1 ml-3 text-slate-200/60 md:text-[28px] xl:text-[37px]">
                {friend?.firstname} {friend?.lastname}
              </h3>{" "}
              <h3 className="font-mono ml-3 text-slate-400/50 md:text-[18px] xl:text-[27px]">
                {friend?.email}
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
        <div className="text-red-300 sm:gigtitle text-[11px] font-bold font-mono  my-3 ml-5 flex items-center justify-around shadow-sm p-2 shadow-orange-300">
          <h6
            className="text-red-600 mb-1 sm:gigtitle text-[11px]  bg-gray-200  w-fit px-2 py-1 rounded-sm"
            onClick={() => {
              setRefetch(true);

              setFollowers(true);
            }}
          >
            {getFollow(friend, followersLength)}{" "}
            {friend?.followers.length === 0 ? "No followers" : "followers"}
          </h6>

          <h6 className="text-red-600 mb-1 sm:gigtitle text-[11px]  bg-gray-200  w-fit px-2 py-1 rounded-sm">
            {getFollowing(friend, followingLength)}{" "}
            {friend?.followings.length === 0 ? "No followers" : "followings"}
          </h6>
        </div>
        <div className="mt-5 flex-grow flex flex-col gap-2  p-2">
          {!greeting && (
            <div
              className="cursor-pointer w-[100px] md:w-[180px] xl:w-[230px] tracking-tighter absolute p-2 z-50 right-0 bottom-44 m-2 rounded-b-lg rounded-tr-xl shadow-xl  rounded-r-xl bg-slate-600/40 hover:bg-gray-300/50"
              onClick={() =>
                router.push(
                  `/gigme/chat/${friend?.clerkId}/welcome${friend?._id}${friend?.username}`
                )
              }
            >
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
            value={userdata?.firstname !== undefined ? userdata?.firstname : ""}
          />
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="lastname"
            value={userdata?.lastname !== undefined ? userdata?.lastname : ""}
          />
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="Email address"
            value={userdata?.email !== undefined ? userdata?.email : ""}
          />
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="username"
            value={userdata?.username !== undefined ? userdata?.username : ""}
          />{" "}
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="City"
            value={userdata?.city !== undefined ? userdata?.city : ""}
          />
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="instrument"
            value={
              userdata?.instrument !== undefined ? userdata?.instrument : ""
            }
          />{" "}
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 mt-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[] font-bold "
            placeholder="experience"
            value={
              userdata?.experience !== undefined ? userdata?.experience : ""
            }
          />
          <input
            disabled
            type="text"
            className="w-[330px] mx-auto text-gray-300 bg-inherit border border-b-neutral-400 border-x-0 border-t-0 my-4 md:w-[500px] xl:w-[630px] text-base md:text-[25px] xl:text-[33px] font-bold "
            placeholder="experience"
            value={
              `${userdata?.date || "01"}/ ${userdata?.month || "01"}/ ${
                userdata?.year || "0"
              }` !== undefined
                ? `${userdata?.date || "01"}/ ${userdata?.month || "01"}/ ${
                    userdata?.year || "0"
                  }`
                : ""
            }
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
    </>
  );
};

export default FriendsComponent;
