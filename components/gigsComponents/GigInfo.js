"use client";
import { handleCreateGig } from "@/features/gigs";
import { Select, Textarea } from "flowbite-react";
import React, { useCallback, useMemo, useState } from "react";
import { Input } from "../ui/input";

import { Add, PreviewTwoTone } from "@mui/icons-material";
import { Button } from "../ui/button";
import Preview from "./Preview";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CircularProgress } from "@mui/material";
const GigInfo = ({ user }) => {
  const [loading, setLoading] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const minDate = new Date("2020-01-01");
  const maxDate = new Date("2025-01-01");
  const [gigInputs, setInputs] = useState({
    title: "",
    description: "",
    phoneNo: "",
    price: "",
    category: "Piano",
    location: "",
    to: "",
    from: "",
    durationfrom: "am",
    durationto: "pm",
  });
  const toduration = `${gigInputs?.to}${gigInputs?.durationto} `;
  const fromduration = `${gigInputs?.from}${gigInputs?.durationfrom} `;
  let dataInfo = React.useMemo(() => {
    return {
      title: gigInputs?.title,
      description: gigInputs?.description,
      phoneNo: gigInputs?.phoneNo,
      price: gigInputs?.price,
      category: gigInputs?.category,
      location: gigInputs?.location,
      date: new Date(selectedDate),
      to: toduration,
      from: fromduration,
      postedBy: user?.user?._id,
    };
  }, []);
  const handleDate = (date) => {
    setSelectedDate(date);
  };
  const handleInputs = (ev) => {
    setInputs({ ...gigInputs, [ev.target.name]: ev.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleCreateGig(dataInfo, setLoading);
    setInputs({
      title: "",
      description: "",
      phoneNo: "",
      price: "",
      category: "Piano",
      location: "",
      to: "",
      from: "",
      durationfrom: "am",
      durationto: "pm",
    });
  };

  return (
    <div className="h-[calc(80vh-170px)] relative">
      <h6 className="text-center mb-2 font-sans underline">Fill The Details</h6>
      {/* {!open ? ( */}
      <form onSubmit={onSubmit}>
        <div className="w-full  gap-4">
          <Input
            onChange={handleInputs}
            name="title"
            value={gigInputs?.title}
            type="text"
            placeholder="Enter any title"
            className="mb-2"
          />{" "}
          <Textarea
            onChange={handleInputs}
            name="description"
            value={gigInputs?.description}
            style={{ resize: "none", height: "fit-content" }}
            className="min-h-[110px] p-2 mb-2"
            placeholder=" Enter description e.g what songs or the vybe expected in the event/show"
          />
          <Input
            type="text"
            placeholder="Enter phone no: "
            className="mb-2"
            onChange={handleInputs}
            name="phoneNo"
            value={gigInputs?.phoneNo}
          />{" "}
          <Input
            type="text"
            placeholder="Enter price range expected  "
            className="mb-2"
            onChange={handleInputs}
            name="price"
            value={gigInputs?.price}
          />{" "}
          <Input
            type="text"
            placeholder="Enter location  "
            className="mb-2"
            onChange={handleInputs}
            name="location"
            value={gigInputs?.location}
          />{" "}
          <select
            onChange={handleInputs}
            name="category"
            value={gigInputs?.category}
            className="mb-2 w-full bg-white  h-[40px] rounded-md p-3 text-[15px]  font-mono"
          >
            <option value="piano">Piano</option>
            <option value="guitar">Guitar</option>
            <option value="bass">Bass Guitar</option>
            <option value="saxophone">Saxophone</option>
            <option value="violin">Violin</option>
            <option value="ukulele">Ukulele</option>{" "}
            <option value="harp">Harp</option>
            <option value="xylophone">Xylophone</option>{" "}
            <option value="cello">Cello</option>
            <option value="percussion">Percussion</option>{" "}
          </select>
          <div className="flex items-center flex-col gap-2 mt-5">
            <div className="flex items-center gap-3">
              {" "}
              <h6 className="mb-2 w-[50px] bg-neutral-200 font-mono">from:</h6>
              <Input
                type="text"
                placeholder=" Time e.g 10 means 10:00 "
                className="mb-2"
                onChange={handleInputs}
                name="from"
                value={gigInputs?.from}
              />{" "}
              <select
                onChange={handleInputs}
                name="durationfrom"
                value={gigInputs?.durationfrom}
                className="mb-2 w-[50px] bg-neutral-300 h-[40px] rounded-full text-[12px] flex justify-center items-center p-2 font-mono"
              >
                <option value="pm">PM</option>
                <option value="am">AM</option>
              </select>{" "}
            </div>
            <div className="flex items-center gap-3">
              <h6 className="mb-2 w-[50px] bg-neutral-200 font-mono">to:</h6>
              <Input
                type="text"
                placeholder=" Time e.g 10 means 10:00 "
                className="mb-2"
                onChange={handleInputs}
                name="to"
                value={gigInputs?.to}
              />{" "}
              <select
                onChange={handleInputs}
                name="durationto"
                value={gigInputs?.durationto}
                className="mb-2 w-[50px] bg-neutral-300 h-[40px] rounded-full text-[12px] flex justify-center items-center p-2 font-mono"
              >
                <option value="pm">PM</option>
                <option value="am">AM</option>
              </select>{" "}
            </div>
            {/* date here */}
            <DatePicker
              selected={selectedDate}
              onChange={handleDate}
              dateFormat="MM/DD/YYYY"
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Set Event Date"
              className="font-mono p-2 w-full rounded-lg"
            />
          </div>
        </div>{" "}
        <Button variant="primary" type="submit" className="mt-4 w-full">
          {!loading ? (
            "Create Gig"
          ) : (
            <CircularProgress size="14px" sx={{ color: "white" }} />
          )}
        </Button>
      </form>
    </div>
  );
};

export default GigInfo;
