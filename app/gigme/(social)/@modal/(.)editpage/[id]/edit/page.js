"use client";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CircularProgress } from "@mui/material";
import { EyeIcon, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "flowbite-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
const EditPage = () => {
  const router = useRouter();
  const params = useParams();
  const { userId } = useAuth();
  const [userposts, setGig] = useState([]);
  console.log(params);

  async function getGig() {
    try {
      const res = await fetch(`/api/gigs/getgig/${params?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const gigs = await res.json();
      setGig(gigs);
      return gigs;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getGig();
  }, []);
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
    durationto: "am",
    durationfrom: "pm",
    bussinesscat: "",
  });

  useEffect(() => {
    setGigs(() => {
      return {
        title: userposts?.gigs?.title,
        description: userposts?.gigs?.description,
        phoneNo: userposts?.gigs?.phone,
        price: userposts?.gigs?.price,
        category: userposts?.gigs?.category,
        location: userposts?.gigs?.location,
        secret: userposts?.gigs?.secret,
        bussinesscat: userposts?.gigs?.bussinesscat,
        durationto: "am",
        durationfrom: "pm",
      };
    });
  }, []);
  const [loading, setLoading] = useState();
  const [secretpass, setSecretPass] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const minDate = new Date("2020-01-01");
  const maxDate = new Date("2025-01-01");
  const [secretreturn, setSecretReturn] = useState("");

  console.log(gigInputs);
  const toduration = `${gigInputs?.end}${gigInputs?.durationto} `;
  const fromduration = `${gigInputs?.start}${gigInputs?.durationfrom} `;
  const [userinfo, setUserInfo] = useState({
    prefferences: [],
  });
  let dataInfo = {
    title: gigInputs?.title || userposts?.gigs?.title,
    description: gigInputs?.description || userposts?.gigs?.description,
    phoneNo: gigInputs?.phoneNo || userposts?.gigs?.phone,
    price: gigInputs?.price || userposts?.gigs?.price,
    category: gigInputs?.category || userposts?.gigs?.category,
    bandCategory: userinfo?.prefferences,
    location: gigInputs?.location || userposts?.gigs?.location,
    secret: gigInputs?.secret || userposts?.gigs?.secret,
    date: new Date(selectedDate) || userposts?.gigs?.date,
    to: toduration,
    from: fromduration,

    bussinesscat: gigInputs?.bussinesscat || userposts?.gigs?.bussinesscat,
  };
  const handleDate = (date) => {
    setSelectedDate(date);
  };

  console.log(userposts);
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
  console.log(dataInfo);
  // submit gig
  const onSubmit = async (event) => {
    event.preventDefault();

    // This gig we want cool and calm music. We dont want to focus on one of the audience.So try to make it old school and vybyy too.This gig we want cool and calm music. We dont want
    // to focus on one of the audience.So try to make it old school and vybyy too.
    if (
      !gigInputs.end ||
      !gigInputs.start ||
      !gigInputs.durationfrom ||
      !gigInputs.durationto
    ) {
      console.log(dataInfo);
      alert("Please check time and bussiness categories");
      return;
    }
    if (
      gigInputs.bussinesscat === "other" &&
      userinfo.prefferences.length < 0
    ) {
      alert("Please check the band category ,might be empty");
      return;
    }
    if (!gigInputs.category && userinfo.prefferences.length < 0) {
      alert("Please filla all required fields");
      return;
    }
    if (gigInputs?.category?.length > 0 && userinfo?.prefferences?.length > 0) {
      alert("Cant use individual and other categories at the same time");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/gigs/editgig/${userposts?.gigs?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataInfo,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.gigstatus === "false") {
        setSecretReturn(data?.message);
        setLoading(false);
      }
      if (data.gigstatus === "true") {
        toast.success(data?.message);

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
        router.back();
        // router.push(`/gigme/gigs/${userId}`);

        setLoading(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <Dialog
      open
      className="h-fit  w-[100%] mx-auto"
      onOpenChange={(isOpen) => {
        if (!isOpen) router.back();
      }}
    >
      <DialogContent className="sm:max-w-md w-[85%] md:w-[90%] xl:w-[90%]  ">
        <DialogHeader>
          <DialogTitle className="text-[13px]">Edit Gig Here!!</DialogTitle>
          <DialogDescription className="text-[10px]">
            You can update new gig changes from here
          </DialogDescription>
        </DialogHeader>
        <div className="h-full relative w-full mx-auto">
          {/* {!open ? ( */}
          <form onSubmit={onSubmit}>
            <select
              onChange={(ev) =>
                setGigs((prev) => {
                  return { ...prev, bussinesscat: ev.target.value };
                })
              }
              name="durationfrom"
              value={gigInputs?.bussinesscat || userposts?.gigs?.bussinesscat}
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
                    ? `flex flex-col gap-2  `
                    : `flex flex-col gap-2 h-[70px] `
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
                    value={gigInputs?.secret || userposts?.gigs?.secret}
                    type={!secretpass ? "password" : "text"}
                    placeholder="Enter secret,  NB://(valid only once)"
                    className="mb-2 border-1 shadow-sm mt-1 text-gray-300 border-slate-900 shadow-purple-200 p-2 rounded-xl "
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
                value={gigInputs?.title || userposts?.gigs?.title}
                type="text"
                placeholder="Enter any title"
                className="mb-2 border-1 shadow-sm mt-1 p-2 text-gray-300 border-slate-900 shadow-purple-200  rounded-xl w-[100%] title focus-visible:ring-0 outline-0 placeholder-[8px]"
              />{" "}
              <Textarea
                onChange={(ev) =>
                  setGigs((prev) => {
                    return { ...prev, description: ev.target.value };
                  })
                }
                name="description"
                value={
                  gigInputs?.description ||
                  userposts?.gigs?.description ||
                  userposts
                }
                style={{ resize: "none", height: "fit-content" }}
                className="min-h-[110px] p-2 mb-2 text-gray-300 "
                placeholder=" Enter description e.g what songs or the vybe expected in the event/show"
              />
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter phone no: "
                className="mb-2 border-1 shadow-sm mt-1 text-gray-300 border-slate-900 shadow-purple-200 p-2 rounded-xl w-[100%] title focus:ring-0 outline-0 placeholder-[8px]"
                onChange={(ev) =>
                  setGigs((prev) => {
                    return { ...prev, phoneNo: ev.target.value };
                  })
                }
                name="phoneNo"
                value={gigInputs?.phoneNo || userposts?.gigs?.phone}
              />{" "}
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter price range expected  "
                className="mb-2 border-1 shadow-sm mt-1 text-gray-300 border-slate-900 shadow-purple-200 p-2 rounded-xl w-[100%] title focus-visible:ring-0 outline-0 placeholder-[8px]"
                onChange={(ev) =>
                  setGigs((prev) => {
                    return { ...prev, price: ev.target.value };
                  })
                }
                name="price"
                value={gigInputs?.price || userposts?.gigs?.price}
              />{" "}
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter location  "
                className="mb-2 border-1 shadow-sm mt-1 text-gray-300 border-slate-900 shadow-purple-200 p-2 rounded-xl w-[100%] title focus-visible:ring-0 outline-0 placeholder-[8px]"
                size="10px"
                sx={{ height: "10px" }}
                onChange={(ev) =>
                  setGigs((prev) => {
                    return { ...prev, location: ev.target.value };
                  })
                }
                name="location"
                value={gigInputs?.location || userposts?.gigs?.location}
              />{" "}
              <>
                {gigInputs?.bussinesscat === "other" ? (
                  <h6 className="choice mb-2 font-bold underline text-center text-gray-900">
                    Choose the setUp of the show
                  </h6>
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
                    value={gigInputs?.category || userposts?.gigs?.category}
                    className="mb-2 w-full  h-[28px] text-gray-300 rounded-md text-[12px]  p-2 font-mono"
                  >
                    <option value="">None</option>
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
                  <div className="h-fit rounded-lg shadow-xl gap-5   bg-gray-100 p-3 choice flex flex-wrap">
                    <div>
                      <input
                        className="text-[5px] text-gray-300"
                        onChange={handleChange}
                        type="checkbox"
                        id="vocalist"
                        name="vocalist"
                        value="vocalist"
                      />
                      <label className="link text-gray-900" htmlFor="vocalist">
                        vocalist
                      </label>
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
                      <label className="link text-gray-900" htmlFor="piano">
                        Piano
                      </label>
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
                      <label className=" link text-gray-900" htmlFor="sax">
                        Saxophone
                      </label>
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
                      <label className=" link text-gray-900" htmlFor="guitar">
                        Guitar
                      </label>
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
                      <label className="link text-gray-900" htmlFor="drums">
                        Drums
                      </label>
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
                      <label className="link text-gray-900" htmlFor="bass">
                        Bass
                      </label>
                    </div>
                  </div>
                )}
              </>
              <div className="flex items-center flex-col gap-2 mt-7">
                <div className="flex items-center gap-3">
                  {" "}
                  <h6 className="mb-2 w-[36px] bg-neutral-100  text-[12px] p-2 font-mono">
                    from:
                  </h6>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder=" Time e.g 10 means 10:00 "
                    className="mb-2 border-1 shadow-sm mt-1 text-white border-slate-900 shadow-purple-200 p-2 rounded-xl w-[100%] title focus-visible:ring-0 outline-0 placeholder-[8px]"
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
                    className="mb-2 w-[38px] bg-neutral-300 h-[38px] rounded-full text-[9px] flex justify-center items-center p-2 font-mono"
                  >
                    <option value="pm">PM</option>
                    <option value="am">AM</option>
                  </select>{" "}
                </div>
                <div className="flex items-center gap-3">
                  <h6 className="mb-2 w-[36px] bg-neutral-100 text-[12px] p-2 font-mono">
                    to:
                  </h6>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder=" Time e.g 10 means 10:00 "
                    className="mb-2 border-1 shadow-sm mt-1 text-white border-slate-900 shadow-purple-200 p-2 rounded-xl w-[100%] title focus-visible:ring-0 outline-0 placeholder-[8px]"
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
                    className="mb-2 w-[38px] bg-neutral-300 h-[38px] rounded-full text-[9px] flex justify-center items-center p-2 font-mono"
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
                  className="font-mono p-2 w-full rounded-lg text-white  shadow-xl"
                />
              </div>
            </div>{" "}
            <Button variant="primary" type="submit" className="mt-4 w-full">
              {!loading ? (
                "Edit Gig"
              ) : (
                <CircularProgress size="14px" sx={{ color: "white" }} />
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPage;
