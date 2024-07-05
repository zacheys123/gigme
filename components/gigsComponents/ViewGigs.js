"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Divider } from "@mui/material";

const ViewGigs = () => {
  const [typeOfGig, setTypeOfGig] = useState();
  const getGigs = async () => {
    const res = await fetch(`http://localhost:3000/api/gigs/${typeOfGig}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  };
  useEffect(() => {
    getGigs();
  }, [typeOfGig]);
  return (
    <div className="overflow-auto element-with-scroll">
      <Select
        className="mb-2"
        value={typeOfGig}
        onOpenChange={(ev) => setTypeOfGig(ev.target.value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Gig Display Options" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="published">Published Gigs</SelectItem>
          <SelectItem value="created">Created Gigs</SelectItem>
        </SelectContent>
      </Select>
      <Divider />
      <div className="bg-neutral-200 w-full h-[100%]"></div>
    </div>
  );
};

export default ViewGigs;
