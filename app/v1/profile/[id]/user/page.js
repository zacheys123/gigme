"use client";
import { Box, Card } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import myimage from "@/public/assets/left-image.jpg";
import { Input } from "@/components/ui/input";
import UsersButton from "@/components/UsersButton";
import { Label, Select } from "flowbite-react";
import { instruments, experiences } from "@/data";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Logo from "@/components/Logo";
const UserProfile = () => {
  const { userId } = useAuth();
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [verification, setVerify] = useState("");
  const [instrument, setInstrument] = useState("Piano");
  const [experience, setExperience] = useState("noexp");
  const [age, setAge] = useState("1");
  const [city, setCity] = useState("");
  const [month, setMonth] = useState("january");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState({ error: "", success: "" });

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

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["userdata"],
    queryFn: async () => {
      const res = await fetch(`/api/user/getuser/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { OnlyUser } = await res.json();

      return OnlyUser;
    },
  });
  useEffect(() => {
    if (status === "success") {
      setFirstname(data[0]?.firstname);
      setLastname(data[0]?.lastname);
      setPhone(data[0]?.phone);
      setUsername(data[0]?.username);
      setVerify(`Email Status: ${data[0]?.verification}`);
      setEmail(data[0]?.email);
    }
  }, [data, status]);
  const handleUpdate = async () => {
    let datainfo = {
      city: city,
      instrument: instrument,
      experience: experience,
      age: age,
      month: month,
      year: year,
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
        if (resdata.success) {
          // setMessage((prev) => {
          //   return { ...prev, success: resdata.message };
          // });
          // setCity((prev) => prev===resdata?.userdata?.city);

          setLoading(false);
        } else {
          setLoading(false);
          setTimeout(() => {
            setMessage((prev) => {
              return { ...prev, error: "" };
            });
          }, 3000);
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
  return (
    <div className="container h-full flex-col md:flex ">
      <div className="flex justify-between items-center  md:hidden -mb-[30px]">
        <Logo />
        <UserButton />
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
          <h2 className="text-white font-bold text-[15px] hidden md:flex text-center">
            Add More Info
          </h2>
          <form className="w-full h-full  md:w-[700px]">
            <Input type="text" className="mt-4" value={firstname} disabled />
            <Input
              type="text"
              className="mt-4"
              value={lastname}
              disabled
            />{" "}
            <Input type="text" className="mt-4" value={email} disabled />{" "}
            <Input type="text" className="mt-4" value={username} disabled />{" "}
            <Input type="text" className="mt-4" value={phone} disabled />
            <Input type="text" className="mt-4" value={verification} disabled />
            <Input
              type="text"
              className="mt-4"
              placeholder="City"
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
            />
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
              className="mt-[7px]"
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
            <span className="w-full ">
              <span className="font-bold font-mono  text-white mb-[2rem]">
                Date
              </span>
              <Select value={age} onChange={(ev) => setAge(ev.target.value)}>
                {myarray.map((i) => {
                  return (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                })}
              </Select>
            </span>
            <span className="w-full ">
              <span className="font-bold font-mono ml-[4px]  text-white">
                Month
              </span>
              <Select
                value={month}
                placeholder="Experience"
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
              <Input
                value={year}
                onChange={(ev) => setYear(ev.target.value)}
                type="text"
                className=" text-black"
                placeholder="Year,e.g 1992=>92 or 2024 =>24"
              />
            </span>
            {message.error && (
              <div className="mt-3 w-full ">
                <span className="text-red-500">{message.error}</span>
              </div>
            )}
            {message.success && (
              <div className="mt-3 w-full">
                <span className="text-green-500 text-center">
                  {message.success}
                </span>
              </div>
            )}
            <div className="w-full flex justify-center m-4">
              <UsersButton
                loading={loading}
                title="Update"
                className="text-white mt-[20px] bg-blue-600 p-2 w-[240px] font-sans rounded-xl text-center hover:bg-blue-200/70 hover:text-orange-200 font-bold"
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
