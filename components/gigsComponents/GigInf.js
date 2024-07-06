"use client";
import { handleCreateGig } from "@/features/gigs";
import { Select, Textarea } from "flowbite-react";
import React, { useCallback, useMemo, useState } from "react";
import { Input } from "../ui/input";

import { Add, Preview, PreviewTwoTone } from "@mui/icons-material";
import { Button } from "../ui/button";
const GigInfo = ({ user }) => {
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState();

  const [error, setError] = useState("Data fields are Empty");

  const [gigInputs, setInputs] = useState({
    title: "",
    description: "",
    phoneNo: "",
    price: "",
    category: "",
    location: "",
    date: "",

    to: "",
    from: "",

    durationfrom: "",
    durationto: "",
  });
  const toduration = `${gigInputs?.to}${gigInputs?.durationto} `;
  const fromduration = `${gigInputs?.from}${gigInputs?.durationfrom} `;
  let dataInfo = useMemo(() => {
    return {
      title: gigInputs?.title,
      description: gigInputs?.description,
      phoneNo: gigInputs?.phoneNo,
      price: gigInputs?.price,
      category: gigInputs?.category,
      location: gigInputs?.location,
      date: gigInputs?.date,

      to: toduration,
      from: fromduration,
    };
  }, []);
  const handleInputs = (ev) => {
    setInputs({ ...gigInputs, [ev.target.name]: ev.target.value });
  };
  const createGig = useCallback(
    (ev) => {
      ev.preventDefault();
      console.log(dataInfo);
      handleCreateGig(user, setLoading, setInputs, dataInfo);
    },
    [user, dataInfo]
  );

  function previewFunc(ev) {
    ev.preventDefault();
    console.log(gigInputs);
    if (
      !gigInputs?.category ||
      !gigInputs?.title ||
      !gigInputs?.description ||
      !gigInputs?.phoneNo ||
      !gigInputs?.price ||
      !gigInputs?.location ||
      !gigInputs?.from ||
      !gigInputs?.to ||
      !gigInputs?.durationfrom ||
      !gigInputs?.durationto
    ) {
      alert("Data fields are Empty");
      setError((prev) => prev === "Data fields are Empty");
      return setPreview(false);
    }
    setError("");
    setPreview((prev) => !prev);
  }

  return (
    <div className="h-[calc(80vh-170px)] relative">
      <h6 className="text-center mb-2 font-sans underline">Fill The Details</h6>
      {!preview ? (
        <form>
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
            <Select
              onChange={handleInputs}
              name="category"
              value={gigInputs?.category}
              className="mb-2 w-full bg-white h-[40px] rounded-md p-3 text-[15px] text-neutral-500 font-mono"
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
            </Select>
            <div className="flex items-center flex-col gap-2 mt-5">
              <div className="flex items-center gap-3">
                {" "}
                <h6 className="mb-2 w-[50px] bg-neutral-200 font-mono">
                  from:
                </h6>
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
              <input type="date" onChange={handleInputs} />
              {!error && (
                <h6 className="text-red-500 text-center font-mono">{error}</h6>
              )}
            </div>
            <Button
              type="button"
              className="mt-4 mx-auto h-[30px] text-[12px]"
              onClick={previewFunc}
            >
              Preview
              <PreviewTwoTone size="11px" />
            </Button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={createGig}
          className="bg-neutral-800 rounded-lg shadow-xl p-3"
        >
          <div className="w-full  gap-4">
            <Input
              type="text"
              placeholder="Enter any title"
              className="mb-2"
              onChange={handleInputs}
              name="title"
              value={gigInputs?.title}
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
              className="mb-2 w-full  h-[40px] rounded-md p-3 text-[15px]  font-mono"
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
                <h6 className="mb-2 w-[50px] bg-neutral-200 font-mono">
                  from:
                </h6>
                <Input
                  type="text"
                  placeholder=" Time e.g 10 means 10:00 "
                  className="mb-2"
                  onChange={handleInputs}
                  name="time"
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
              <input type="date" onChange={handleInputs} />
            </div>
            <Button
              variant="primary"
              type="submit"
              className="mt-4 mx-auto"
              onClick={() => setPreview((prev) => !prev)}
            >
              Create Gig
              <PreviewTwoTone />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default GigInfo;
