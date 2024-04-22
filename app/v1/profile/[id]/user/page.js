"use client";
import { Box, Card } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import myimage from "@/public/assets/left.jpg";
import { Input } from "@/components/ui/input";
import UsersButton from "@/components/UsersButton";
import { Label, Select } from "flowbite-react";
import { instruments, experiences } from "@/data";
const UserProfile = () => {
  const [instrument, setInstrument] = useState("");
  const [experience, setExperience] = useState("");
  const [age, setAge] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  console.log(instrument);
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

  return (
    <div className="h-full w-100 flex justify-center items-center">
      <Card className="flex  gap-3 h-[600px]">
        <Box>
          <Image
            src={myimage}
            alt="avatar"
            className="w-32 h-32 flex-grow"
            width="40rem"
            height="40rem"
          />
        </Box>
        <form className="p-3 w-[300px]">
          <Input type="text" placeholder="City" />

          <Select
            value={instrument}
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
          <div className="flex flex-col md:flex md:items-center md:justify-evenly gap-1">
            <Label htmlFor="age">
              Age
              <Select value={age} onChange={(ev) => setAge(ev.target.value)}>
                {myarray.map((i) => {
                  return (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                })}
              </Select>
            </Label>
            <Label htmlFor="month">
              Month
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
            </Label>
            <Label htmlFor="year">
              Year
              <Input
                value={year}
                onChange={(ev) => setYear(ev.target.value)}
                type="text"
                placeholder="Year,e.g 1992=>92 or 2024=>24"
              />
            </Label>
          </div>
          <UsersButton title="Update" />
        </form>
      </Card>
    </div>
  );
};

export default UserProfile;
