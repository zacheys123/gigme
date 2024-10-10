"use client";
import { Box, Card, CircularProgress } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import myimage from "@/public/assets/left-image.jpg";
import { Input } from "@/components/ui/input";
import UsersButton from "@/components/UsersButton";
import Transition from "@/components/Transition";
import { Label, Select, TextInput } from "flowbite-react";
import { instruments, experiences } from "@/data";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AvatarComponent from "@/components/Avatar";
import UserModal from "@/components/modals/UserModal";
import Modal from "../modals/Modal";
import CurrentUserFollowersModal from "../modals/CurrentUserFollowersModal";
import useStore from "@/app/zustand/useStore";
import { toast } from "sonner";

const CurrentUserProfile = ({ user }) => {
  const { userId } = useAuth();
  const { setCurrentFollowers } = useStore();
  const [loadinguser, setLoadingUser] = useState();
  // Get current User

  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [verification, setVerify] = useState("");
  const [instrument, setInstrument] = useState("Piano");
  const [experience, setExperience] = useState("noexp");
  const [age, setAge] = useState("1");
  const [city, setCity] = useState("");
  const [month, setMonth] = useState();
  const [year, setYear] = useState("");
  const [message, setMessage] = useState({
    error: "",
    success: "",
  });

  const [loading, setLoading] = useState(false);

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let myarray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  console.log(user);
  const [updateFetch, setFetch] = useState(false);
  useEffect(() => {
    setFirstname(user?.firstname);
    setLastname(user?.lastname);
    setPhone(user?.phone);
    setUsername(user?.username);
    setVerify(`Email Status: ${user?.verification}`);
    setEmail(user?.email);
    setCity(user?.city);
    setExperience(user?.experience);
    setInstrument(user?.instrument);
    setYear(user?.year);
    setMonth(user?.month);
    setAge(user?.date);
    setAddress(user?.address);
  }, [user, updateFetch]);
  const handleUpdate = async () => {
    let datainfo = {
      city: city,
      instrument: instrument,
      experience: experience,
      age: age,
      month: month,
      year: year,
      address,
    };

    if (user) {
      try {
        setLoading(true);
        let res = await fetch(`/api/user/update/${user?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datainfo),
        });
        let resdata = await res.json();
        console.log(resdata);
        if (resdata.updateStatus === true) {
          setMessage((prev) => {
            return { ...prev, success: resdata.message };
          });
          toast.success(resdata.message);
          setFetch(true);

          // setCity((prev) => prev===resdata?.userdata?.city);

          setLoading(false);
        } else {
          setLoading(false);

          toast.error(resdata.message);

          setMessage((prev) => {
            return { ...prev, error: resdata.message };
          });
          console.log(resdata.message);
        }
      } catch (error) {
        setLoading(false);

        setMessage((prev) => {
          return { ...prev, error: resdata.message };
        });
        console.log(error);
      }
    }
    setLoading(false);
  };
  let variant2 = {
    initial: {
      x: ["-400px", "-300px", "-100px", "0px", "50px", "100px", "140px", "0"],
      opacity: 0,
    },
    animate: { x: 0, opacity: 1 },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };
  const foll =
    user?.followers?.length === 1
      ? `${user?.followers?.length} follower`
      : user?.followers === undefined
      ? ""
      : `${user?.followers?.length} followers`;
  const following =
    user?.followings?.length === 1
      ? `${user?.followings?.length} followings`
      : user?.followings === undefined
      ? ""
      : `${user?.followings?.length} followings`;
  if (!user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h6 className="text-white">Loading profile data...</h6>
      </div>
    );
  }

  return (
    <>
      <Modal>
        {" "}
        <UserModal />
      </Modal>
      {user ? (
        <Modal>
          {" "}
          <CurrentUserFollowersModal width="260" />
        </Modal>
      ) : (
        <div className="w-full h-[100vh] flex justify-center items-center choice">
          loading....
        </div>
      )}
      <div className="container flex justify-between items-center   mt-[25px] -mb-5 shadow-sm shadow-red-500">
        <Logo />
        <h3 className="text-white font-bold hidden md:block text-[12px]">
          {" "}
          Add More Info
        </h3>
        <div className=" md:block  ">
          {" "}
          <AvatarComponent
            usercomm={user}
            posts="w-[32px] h-[32px] rounded-full object-fit"
          />
        </div>
      </div>{" "}
      <Box className="block w-full lg:flex gap-3 h-full">
        {" "}
        {/* <Box className="hidden md:hidden   w-[500px] h-100 lg:flex justify-center items-center ">
          <Image
            src={myimage}
            alt="avatar"
            className="w-[100px] h-[100px] flex-grow object-fill"
            width={100}
            height={100}
          />
        </Box> */}
        <div className="w-full   md:w-50 py-7 h-[800px]      lg:ml-[70px]">
          <div>
            {!loadinguser && (
              <div className="text-red-300 text-[14px] font-bold font-mono  my-3 ml-8 flex items-center justify-between">
                {user?.followers?.length === 0 ? (
                  <h6 className="text-red-300 text-[14px]">No followers</h6>
                ) : (
                  <h6
                    className="text-red-600 mb-1 text-[14px]  bg-gray-200  w-fit p-1 rounded-sm"
                    onClick={() => {
                      setCurrentFollowers(true);
                    }}
                  >
                    {foll}
                  </h6>
                )}
                {user?.followings?.length === 0 ? (
                  <h6 className="text-red-300 text-[14px] mr-4">
                    No followings
                  </h6>
                ) : (
                  <h6 className="text-red-600 mb-1 text-[14px]  bg-gray-200  w-fit p-1 rounded-sm">
                    {following}
                  </h6>
                )}
              </div>
            )}
          </div>
          <form className="w-[350px] h-full  md:w-[600px] mx-auto  flex flex-col ">
            <div>
              <div className=" h-[165px] mt-3 w-full ">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400 font-bold font-mono mt-2 mx-2 mb-1 text-[13px]">
                    FullNames
                  </span>
                  <Input
                    type="text"
                    className="md:text-slate-200 text-blue-100 md:w-[80%] mx-auto font-bold text-[12px] my-3"
                    value={firstname !== undefined ? firstname : ""}
                    disabled
                  />
                </div>
                <Input
                  type="text"
                  className="md:text-slate-200 text-blue-100 md:w-[80%] mx-auto font-bold text-[12px] my-3"
                  value={lastname !== undefined ? lastname : ""}
                  disabled
                />
              </div>
              <div className=" h-[165px] mt-3 w-full">
                <div className="flex flex-col -gap-[40px]">
                  <span className="text-gray-400 font-bold font-mono m-3 text-[13px]">
                    Authorization Info
                  </span>
                  <Input
                    type="text"
                    className="md:text-slate-200 text-blue-100 md:w-[80%] mx-auto font-bold text-[12px] my-3"
                    value={email !== undefined ? email : ""}
                    disabled
                  />
                </div>
                <Input
                  type="text"
                  className="md:text-slate-200 text-blue-100 md:w-[80%] mx-auto font-bold text-[12px] my-3"
                  value={username !== undefined ? username : ""}
                  disabled
                />
              </div>{" "}
              <div className=" h-[165px] mt-3 w-full">
                <div className="flex flex-col -gap-[40px]">
                  <span className="text-gray-400 font-bold font-mono m-3 text-[13px]">
                    More Info
                  </span>
                  <Input
                    type="text"
                    placeholder="Phone No"
                    className="md:text-slate-200 text-blue-100 md:w-[80%] mx-auto font-bold text-[12px] my-3"
                    value={phone !== undefined ? phone : ""}
                    disabled
                  />
                </div>
                <Input
                  type="text"
                  className="md:text-slate-200 text-blue-100 md:w-[80%] mx-auto font-bold text-[12px] my-3"
                  value={verification !== undefined ? verification : ""}
                  disabled
                />
              </div>{" "}
              <div className=" h-[200px] my-3 w-full">
                <div className="flex flex-col -gap-[40px]">
                  <span className="text-gray-400 font-bold font-mono m-3 text-[13px]">
                    Geographical Info
                  </span>
                  <div className="w-full">
                    {" "}
                    <span className="text-[11px] titler font-bold font-mono  text-gray-400  ">
                      City
                    </span>
                    <Input
                      type="text"
                      className="md:text-slate-500 text-blue-700 md:w-[80%] mx-auto font-bold text-[12px] my-3 cus:ring-0 outline-none"
                      placeholder="City"
                      value={city !== undefined ? city : ""}
                      onChange={(ev) => setCity(ev.target.value)}
                    />{" "}
                  </div>
                </div>
                <div className="w-full ">
                  {" "}
                  <span className="text-[11px] titler font-bold font-mono  text-gray-400  ">
                    Address
                  </span>
                  <Input
                    type="text"
                    className="md:text-slate-200 text-blue-700 md:w-[80%] mx-auto font-bold text-[12px] my-3 cus:ring-0 outline-none"
                    placeholder="Addresss 1/P.O BOX"
                    value={address !== undefined ? address : ""}
                    onChange={(ev) => setAddress(ev.target.value)}
                  />
                </div>
                {message?.error?.split(" ").includes("City") && city === "" && (
                  <div className="ml-3 mt-3 w-full ">
                    <span className="text-red-500 font-bold font-mono">
                      {message.error}
                    </span>
                  </div>
                )}
              </div>{" "}
              <div className="w-full   flex flex-col  my-2">
                <span className="text-[11px]  font-bold font-mono  text-gray-400 mb-2  ">
                  Instrument
                </span>
                <select
                  className=" my-2 titler font-bold   text-blue-400 w-[80%] mx-auto pl-2 element-with-overflow  h-[35px] rounded-md  text-[9px]   font-mono"
                  value={instrument !== undefined ? instrument : ""}
                  placeholder="instrument"
                  onChange={(ev) => setInstrument(ev.target.value)}
                >
                  {instruments().map((ins) => {
                    return (
                      <option key={ins.id} value={ins.name}>
                        {ins.val}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-[80%] mx-auto   flex flex-col  my-2">
                <span className="text-[11px] text-gray-400 mb-2  font-bold font-mono   ">
                  Experience
                </span>
                <select
                  className=" text-blue-400 titler w-full  pl-2 element-with-overflow  h-[35px]  rounded-md  text-[9px] font-bold  font-mono"
                  value={experience !== undefined ? experience : ""}
                  placeholder="Experience"
                  onChange={(ev) => setExperience(ev.target.value)}
                >
                  {experiences().map((ex) => {
                    return (
                      <option key={ex.id} value={ex.name}>
                        {ex.val}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-[80%] mx-auto   flex flex-col">
                <span className="text-[11px] font-bold font-mono  text-gray-400  ">
                  Date
                </span>
                <select
                  className="w-full text-blue-400 titler pl-2 element-with-overflow  h-[35px]  rounded-md  text-[9px] font-bold  font-mono"
                  value={age !== undefined ? age : ""}
                  onChange={(ev) => setAge(ev.target.value)}
                >
                  {myarray.map((i) => {
                    return (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
                <div className="w-full   flex flex-col  my-2">
                  <span className="text-[11px] text-gray-400 mb-2  font-bold font-mono   ">
                    Month
                  </span>
                  <select
                    className="text-blue-400 titler text-[10px] w-full  pl-2 element-with-overflow  h-[35px] rounded-md   font-bold  font-mono"
                    value={month !== undefined ? month : ""}
                    onChange={(ev) => setMonth(ev.target.value)}
                  >
                    {months.map((ex) => {
                      return (
                        <option key={ex} value={ex}>
                          {ex}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full   flex flex-col  my-2">
                  <span className="text-[11px] text-gray-400 mb-2  font-bold font-mono   ">
                    Year
                  </span>
                  <Input
                    value={year !== undefined ? year : ""}
                    onChange={(ev) => setYear(ev.target.value)}
                    type="text"
                    className={
                      message?.error?.split(" ").includes("year") && year === ""
                        ? "border-2 border-red-500 rounded-xl  outline-none focus:ring-0 text-blue-600 md:text-gray-400 font-bold "
                        : "mt-1 border-neutral-300    focus:ring-0 text-blue-600 md:text-blue-700 md:w-[80%] mx-auto font-bold "
                    }
                    placeholder="Year,e.g 1992=>92 or 2024 =>24"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center -ml-[14px]   items-center mt-[15px] mb-[20px] md:my-[40px] md:mb-3 md:-ml-[30px]">
              <Button
                variant="destructive"
                disabled={loading}
                title="Update"
                className="-ml-[13px] text-[12px] h-[26px] mb-4"
                onClick={handleUpdate}
              >
                {!loading ? (
                  "Update Info"
                ) : (
                  <CircularProgress size="20px" sx={{ color: "white" }} />
                )}
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </>
  );
};

export default CurrentUserProfile;
