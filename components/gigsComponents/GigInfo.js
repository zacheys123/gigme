"use client";
import { handleCreateGig } from "@/features/gigs";
import { Select, Textarea, input } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

import { Add, PreviewTwoTone } from "@mui/icons-material";
import { Button } from "../ui/button";
import Preview from "./Preview";
import DatePicker from "react-datepicker";
import Checkbox from "@mui/material/Checkbox";
import "react-datepicker/dist/react-datepicker.css";
import { CircularProgress } from "@mui/material";
import { EyeIcon, EyeOff } from "lucide-react";
import { toast } from "sonner";
import useStore from "@/app/zustand/useStore";

import { useAuth } from "@clerk/nextjs";
const GigInfo = ({ user }) => {
  const { setAllGigs, setPubGigs } = useStore();
  const { userId } = useAuth();
  const getGigs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gigs/getcreated/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data?.gigs);
      setAllGigs(data?.gigs);
      setPubGigs(data?.gigs);

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getGigs();
  }, []);
  const [loading, setLoading] = useState();
  const [isloading, setIsLoading] = useState();
  const [secretpass, setSecretPass] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const minDate = new Date("2020-01-01");
  const maxDate = new Date("2025-01-01");
  const [secretreturn, setSecretReturn] = useState("");

  const [gigInputs, setGigs] = useState({
    title: "",
    description: "",
    phoneNo: "",
    price: "",
    category: "",
    location: "",
    secret: "",
    end: "",
    start: "",
    durationto: "pm",
    durationfrom: "am",
    secret: "",
    bussinesscat: "personal",
  });
  const toduration = `${gigInputs?.end}${gigInputs?.durationto} `;
  const fromduration = `${gigInputs?.start}${gigInputs?.durationfrom} `;
  const [userinfo, setUserInfo] = useState({
    prefferences: [],
  });
  let dataInfo = {
    title: gigInputs?.title,
    description: gigInputs?.description,
    phoneNo: gigInputs?.phoneNo,
    price: gigInputs?.price,
    category: gigInputs?.category,
    bandCategory: userinfo?.prefferences,
    location: gigInputs?.location,
    secret: gigInputs?.secret,
    date: new Date(selectedDate),
    to: toduration,
    from: fromduration,
    postedBy: user?.user?._id,
    bussinesscat: gigInputs?.bussinesscat,
  };
  const handleDate = (date) => {
    setSelectedDate(date);
  };

  console.log(gigInputs);
  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { prefferences } = userinfo;

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        prefferences: [...prefferences, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        prefferences: prefferences.filter((e) => e !== value),
      });
    }
  };
  // submit gig
  const onSubmit = async (event) => {
    event.preventDefault();

    // This gig we want cool and calm music. We dont want to focus on one of the audience.So try to make it old school and vybyy too.This gig we want cool and calm music. We dont want
    // to focus on one of the audience.So try to make it old school and vybyy too.
    if (
      !gigInputs.title ||
      !gigInputs.description ||
      !gigInputs.phoneNo ||
      !gigInputs.price ||
      !gigInputs.location ||
      !gigInputs.end ||
      !gigInputs.start ||
      !gigInputs.durationfrom ||
      !gigInputs.durationto
    ) {
      console.log(dataInfo);
      alert("Please fill all required fields");
      return;
    }
    if (!gigInputs.category && userinfo.prefferences.length < 0) {
      alert("Please fill all required fields");
      return;
    }
    if (gigInputs.category.length > 0 && userinfo.prefferences.length > 0) {
      alert("Cant use individual and other categories at the same time");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`/api/gigs/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataInfo,
        }),
      });
      const data = await res.json();
      console.log(data);
      setPubGigs(data?.gig);
      setAllGigs(data?.gig);
      if (data.gigstatus === "false") {
        setSecretReturn(data?.message);
      }
      if (data.gigstatus === "true") {
        setPubGigs(data?.gig);
        setAllGigs(data?.gig);
        toast.success(data?.message);
      }

      setSecretReturn("");
      setGigs({
        title: "",
        description: "",
        phoneNo: "",
        price: "",
        category: "",
        location: "",
        secret: "",
        end: "",
        start: "",
        durationto: "pm",
        durationfrom: "am",
        secret: "",
        bussinesscat: "personal",
      });
      setUserInfo({ prefferences: [] });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] overflow-y-scroll relative ">
      {/* {!open ? ( */}
      <div className="h-[100vh] overflow-y-scroll ">
        <form onSubmit={onSubmit} className="h-full overflow-y-scroll">
          <select
            onChange={(ev) =>
              setGigs((prev) => {
                return { ...prev, bussinesscat: ev.target.value };
              })
            }
            name="durationfrom"
            value={gigInputs?.bussinesscat}
            className="mb-2 w-[130px]  bg-neutral-300 h-[30px] rounded-md text-[12px] flex justify-center items-center p-2 font-mono"
          >
            <option value="full">Full Band</option>
            <option value="personal">Individual</option>
            <option value="other">other...</option>
          </select>{" "}
          <div className="w-full  gap-4">
            <div
              className={
                !secretreturn
                  ? `flex flex-col gap-1  `
                  : `flex flex-col gap-1 h-[70px] `
              }
            >
              <div className="flex items-center gap-2">
                <input
                  autoComplete="off"
                  onChange={(ev) =>
                    setGigs((prev) => {
                      return { ...prev, secret: ev.target.value };
                    })
                  }
                  name="secret"
                  value={gigInputs?.secret}
                  type={!secretpass ? "password" : "text"}
                  placeholder="Enter secret,  NB://(valid only once)"
                  className="font-mono  h-[35px] text-[12px]  bg-white mb-2 focus-within:ring-0 outline-none rounded-xl  px-3 text-black"
                />{" "}
                {secretpass ? (
                  <EyeOff
                    onClick={() => setSecretPass((prev) => !prev)}
                    size="18px"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setSecretPass((prev) => !prev)}
                    size="18px"
                  />
                )}
              </div>
              {secretreturn && (
                <h6 className="text-red-500 text-[13px] -mt-2">
                  {secretreturn}
                </h6>
              )}
            </div>
            <input
              autoComplete="off"
              onChange={(ev) =>
                setGigs((prev) => {
                  return { ...prev, title: ev.target.value };
                })
              }
              name="title"
              value={gigInputs?.title}
              type="text"
              placeholder="Enter any title"
              className="font-mono  h-[35px] text-[12px]  bg-white mb-2  focus-within:ring-0 outline-none rounded-xl  px-3 text-black"
            />{" "}
            <Textarea
              onChange={(ev) =>
                setGigs((prev) => {
                  return { ...prev, description: ev.target.value };
                })
              }
              name="description"
              value={gigInputs?.description}
              style={{ resize: "none", height: "fit-content" }}
              className="min-h-[70px] p-2 mb-2"
              placeholder=" Enter description e.g what songs or the vybe expected in the event/show"
            />
            <input
              autoComplete="off"
              type="text"
              placeholder="Enter phone no: "
              className="font-mono  h-[35px] text-[12px]  bg-white mb-2  focus-within:ring-0 outline-none rounded-xl  px-3 text-black"
              onChange={(ev) =>
                setGigs((prev) => {
                  return { ...prev, phoneNo: ev.target.value };
                })
              }
              name="phoneNo"
              value={gigInputs?.phoneNo}
            />{" "}
            <input
              autoComplete="off"
              type="text"
              placeholder="Enter price range expected  "
              className="font-mono  h-[35px] text-[12px]  bg-white mb-2  focus-within:ring-0 outline-none rounded-xl  px-3 text-black"
              onChange={(ev) =>
                setGigs((prev) => {
                  return { ...prev, price: ev.target.value };
                })
              }
              name="price"
              value={gigInputs?.price}
            />{" "}
            <input
              autoComplete="off"
              type="text"
              placeholder="Enter location  "
              className="font-mono  h-[35px] text-[12px]  bg-white mb-2  focus-within:ring-0 outline-none rounded-xl  px-3 text-black w-full"
              onChange={(ev) =>
                setGigs((prev) => {
                  return { ...prev, location: ev.target.value };
                })
              }
              name="location"
              value={gigInputs?.location}
            />{" "}
            <>
              {gigInputs?.bussinesscat === "other" ? (
                <h6 className="choice mb-2">Choose the setUp of the show</h6>
              ) : (
                ""
              )}
              {gigInputs?.bussinesscat === "personal" && (
                <select
                  onChange={(ev) =>
                    setGigs((prev) => {
                      return { ...prev, category: ev.target.value };
                    })
                  }
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
              )}
              {gigInputs?.bussinesscat === "other" && (
                <div className="h-[80px] rounded-lg shadow-xl gap-5  bg-gray-100 p-3 choice flex flex-wrap">
                  <div>
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      id="vocalist"
                      name="vocalist"
                      value="vocalist"
                    />
                    <label htmlFor="vocalist">vocalist</label>
                  </div>
                  <div>
                    {" "}
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      id="piano"
                      name="piano"
                      value="piano"
                    />{" "}
                    <label htmlFor="piano">Piano</label>
                  </div>
                  <div>
                    {" "}
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      id="sax"
                      name="sax"
                      value="sax"
                    />{" "}
                    <label htmlFor="sax">Saxophone</label>
                  </div>{" "}
                  <div>
                    {" "}
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      id="guitar"
                      name="guitar"
                      value="guitar"
                    />{" "}
                    <label htmlFor="guitar">Guitar</label>
                  </div>{" "}
                  <div>
                    {" "}
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      id="drums"
                      name="drums"
                      value="drums"
                    />{" "}
                    <label htmlFor="drums">Drums</label>
                  </div>{" "}
                  <div>
                    {" "}
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      id="bass"
                      name="bass"
                      value="bass"
                    />{" "}
                    <label htmlFor="bass">Bass</label>
                  </div>
                </div>
              )}
            </>
            <div className="flex items-center flex-col gap-2 mt-5">
              <div className="flex items-center gap-3">
                {" "}
                <h6 className="mb-2 w-[50px] bg-neutral-200 font-mono">
                  from:
                </h6>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=" Time e.g 10 means 10:00 "
                  className="mb-2 p-3 focus-within:ring-0 outline-none rounded-xl  px-3 text-black w-[120px]"
                  onChange={(ev) =>
                    setGigs((prev) => {
                      return { ...prev, start: ev.target.value };
                    })
                  }
                  name="start"
                  value={gigInputs?.start}
                />{" "}
                <select
                  onChange={(ev) =>
                    setGigs((prev) => {
                      return { ...prev, durationfrom: ev.target.value };
                    })
                  }
                  name="durationfrom"
                  value={gigInputs?.durationfrom}
                  className="mb-2 w-[55px] bg-neutral-300 h-[40px] rounded-full text-[12px] flex justify-center items-center p-2 font-mono"
                >
                  <option value="pm">PM</option>
                  <option value="am">AM</option>
                </select>{" "}
              </div>
              <div className="flex items-center gap-3">
                <h6 className="mb-2 w-[50px] bg-neutral-200 font-mono">to:</h6>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=" Time e.g 10 means 10:00 "
                  className="mb-2 p-3 focus-within:ring-0 outline-none rounded-xl  px-3 text-black w-[120px]"
                  onChange={(ev) =>
                    setGigs((prev) => {
                      return { ...prev, end: ev.target.value };
                    })
                  }
                  name="end"
                  value={gigInputs?.end}
                />{" "}
                <select
                  onChange={(ev) =>
                    setGigs((prev) => {
                      return { ...prev, durationto: ev.target.value };
                    })
                  }
                  name="durationto"
                  value={gigInputs?.durationto}
                  className="mb-2 w-[55px] bg-neutral-300 h-[40px] rounded-full text-[12px] flex justify-center items-center p-2 font-mono"
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
                className="font-mono  h-[35px] text-[12px]  bg-white mb-2  focus-within:ring-0 outline-none rounded-xl  px-3 text-black w-[300px]"
              />
            </div>{" "}
            <div className="w-full flex justify-center">
              <Button
                variant="destructive"
                type="submit"
                className="mt-4 w-[60%] h-[30px] text-[12px]"
                disabled={isloading}
              >
                {!isloading ? (
                  "Create Gig"
                ) : (
                  <CircularProgress size="14px" sx={{ color: "white" }} />
                )}
              </Button>
            </div>
          </div>{" "}
        </form>
      </div>
    </div>
  );
};

export default GigInfo;
