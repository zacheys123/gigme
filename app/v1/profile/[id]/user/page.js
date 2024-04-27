"use client";
import { Box, Card } from "@mui/material";
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
const UserProfile = () => {
  const { userId } = useAuth();
  // Get current User
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["userdata"],
    queryFn: async () => {
      const res = await fetch(
        `/api/user/getuser/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
        {}
      );
      const { OnlyUser } = await res.json();

      return OnlyUser;
    },
  });
  //

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

  const [updateFetch, setFetch] = useState(false);
  useEffect(() => {
    if (status === "success") {
      setFirstname(data[0]?.firstname);
      setLastname(data[0]?.lastname);
      setPhone(data[0]?.phone);
      setUsername(data[0]?.username);
      setVerify(`Email Status: ${data[0]?.verification}`);
      setEmail(data[0]?.email);
      setCity(data[0]?.city);
      setExperience(data[0]?.experience);
      setInstrument(data[0]?.instrument);
      setYear(data[0]?.year);
      setMonth(data[0]?.month);
      setAge(data[0]?.date);
      setAddress(data[0]?.address);
    }
  }, [data, status, updateFetch]);
  const handleUpdate = async () => {
    console.log("hey");
    let datainfo = {
      city: city,
      instrument: instrument,
      experience: experience,
      age: age,
      month: month,
      year: year,
      address,
    };

    if (status === "success") {
      try {
        setLoading(true);
        let res = await fetch(`/api/user/update/${data[0]._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datainfo),
        });
        let resdata = await res.json();
        console.log(resdata);
        if (resdata.updateStatus === true) {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          setMessage((prev) => {
            return { ...prev, success: resdata.message };
          });
          setFetch(true);

          // setCity((prev) => prev===resdata?.userdata?.city);

          setLoading(false);
        } else {
          setLoading(false);

          setMessage((prev) => {
            return { ...prev, error: "" };
          });

          setMessage((prev) => {
            return { ...prev, error: resdata.message };
          });
          console.log(resdata.message);
        }
      } catch (error) {
        setLoading(false);
        // setMessage((prev) => {
        //   return { ...prev, error: resdata.message };
        // });
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
  const removeBtn = () => {
    return (
      !city ||
      (!address && !instrument) ||
      !experience ||
      !age ||
      !month ||
      !year
    );
  };
  return (
    <div
      className="container md:h-[calc(100vh-110px)]
      h-[calc(100vh-100px)] flex-col md:flex overflow-auto sm:justify-center items-center"
    >
      <div className="flex justify-between items-center  xl:hidden -mb-[30px]">
        <Link
          href="/gigme/social"
          className="tracking-tighter hover:cursor-pointer "
        >
          <span className=" bg-pink-500/50 text-[12px] text-yellow-200 font-bold p-1 rounded-b-xl shadow-red-500">
            GigMe
          </span>
          <span className="text-[12px] text-green-300 bg-white rounded-r-xl  font-bold p-1 shadow-blue-500">
            Up
          </span>
        </Link>
        <h3 className="text-white font-bold md:hidden text-[12px]">
          {" "}
          Add More Info
        </h3>
        <div className="mr-8 md:hidden ">
          {" "}
          <UserButton />
        </div>
      </div>{" "}
      <Box className="block w-full md:flex gap-3 h-full">
        {" "}
        <Box className="hidden md:hidden xl:flex w-[500px] h-100 ">
          <Image
            src={myimage}
            alt="avatar"
            className="w-62 h-100 flex-grow object-fill"
            width={100}
            height={100}
          />
        </Box>
        <div className="w-full flex-col flex justify-center items-center md:w-50 py-7 h-[800px] ">
          <h2 className=" text-white font-bold text-[15px] hidden md:flex text-center">
            Add More Info
          </h2>
          <form className="w-[290px] h-full  md:w-[700px] mx-auto -ml-[4px]">
            <div className="bg-white h-[165px] mt-3">
              <div className="flex flex-col -gap-[40px]">
                <span className="text-black font-bold font-mono m-3">
                  FullNames
                </span>
                <Input type="text" className="" value={firstname} disabled />
              </div>
              <Input type="text" className="" value={lastname} disabled />
            </div>
            <div className="bg-white h-[165px] mt-3">
              <div className="flex flex-col -gap-[40px]">
                <span className="text-black font-bold font-mono m-3">
                  Authorization Info
                </span>
                <Input type="text" className="" value={email} disabled />
              </div>
              <Input type="text" className="" value={username} disabled />
            </div>{" "}
            <div className="bg-white h-[165px] mt-3">
              <div className="flex flex-col -gap-[40px]">
                <span className="text-black font-bold font-mono m-3">
                  More Info
                </span>
                <Input
                  type="text"
                  placeholder="Phone No"
                  className=""
                  value={phone}
                  disabled
                />
              </div>
              <Input type="text" className="" value={verification} disabled />
            </div>{" "}
            <div className="bg-white h-[200px] mt-3">
              <div className="flex flex-col -gap-[40px]">
                <span className="text-black font-bold font-mono m-3">
                  Personal Info
                </span>
                <TextInput
                  type="text"
                  className={
                    message?.error?.split(" ").includes("City") && city === ""
                      ? "border border-red-500 rounded-md outline-none w-[120px]  mx-auto focus:ring-0 md:w-[650px] xl:w-[670px]"
                      : "mt-3 border-neutral-300 w-[280px] mx-auto md:w-[650px] xl:w-[670px]  focus:ring-0 "
                  }
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
              <TextInput
                type="text"
                className="mt-3 border-neutral-300 w-[280px] md:w-[650px] mx-auto focus:ring-0 xl:w-[670px]"
                placeholder="Addresss 1/P.O BOX"
                value={address}
                onChange={(ev) => setAddress(ev.target.value)}
              />
              {message?.error?.split(" ").includes("City") && city === "" && (
                <div className="ml-3 mt-3 w-full ">
                  <span className="text-red-500 font-bold font-mono">
                    {message.error}
                  </span>
                </div>
              )}
            </div>{" "}
            <Select
              value={instrument}
              className="mt-[7px]"
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
            </Select>
            <Select
              value={experience}
              className="mt-[5px]"
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
            </Select>
            <div className="w-full  h-[200px]">
              <span className="font-bold font-mono  text-white ">Date</span>
              <Select value={age} onChange={(ev) => setAge(ev.target.value)}>
                {myarray.map((i) => {
                  return (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                })}
              </Select>
              <span className="w-full ">
                <span className="font-bold font-mono ml-[4px]  text-white">
                  Month
                </span>
                <Select
                  value={month}
                  onChange={(ev) => setMonth(ev.target.value)}
                >
                  {months.map((ex) => {
                    return (
                      <option key={ex} value={ex}>
                        {ex}
                      </option>
                    );
                  })}
                </Select>
              </span>
              <span className="w-full  text-white  ">
                <span className="font-bold font-mono ml-[4px]  text-white">
                  Year
                </span>
                <TextInput
                  value={year}
                  onChange={(ev) => setYear(ev.target.value)}
                  type="text"
                  className={
                    message?.error?.split(" ").includes("year") && year === ""
                      ? "border-2 border-red-500 rounded-xl  outline-none focus:ring-0 "
                      : "mt-3 border-neutral-300    focus:ring-0 "
                  }
                  placeholder="Year,e.g 1992=>92 or 2024 =>24"
                />
              </span>
              {message?.error?.split(" ").includes("year") && year === "" && (
                <div className="ml-3 mb-4 w-full ">
                  <span className="text-red-500 font-bold font-mono">
                    {message.error}{" "}
                  </span>
                </div>
              )}
              {message.success && (
                <Transition
                  variant={variant2}
                  className="text-green-500 mx-[250px] mt-3 text-center hidden md:flex"
                >
                  {message.success}
                </Transition>
              )}
            </div>
            <div className="w-full flex justify-center m-4">
              <UsersButton
                disabled={loading}
                loading={loading}
                title="Update"
                className="text-white mt-[50px] bg-purple-700 p-2 w-[210px] font-sans rounded-xl text-center hover:bg-blue-200/70 hover:text-orange-200 font-bold"
                onClick={handleUpdate}
              />
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default UserProfile;
