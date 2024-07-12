"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Divider } from "@mui/material";

const Created = () => {
  const [typeOfGig, setTypeOfGig] = useState();
  return (
    <div className="w-full h-full p-2 shadow-sm mt-3">
      <Select
        className="mb-2"
        value={typeOfGig}
        onChange={(ev) => setTypeOfGig(ev.target.value)}
      >
        <SelectTrigger className="w-[90px]">
          <SelectValue placeholder="filterBy:" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="created">category</SelectItem>
          <SelectItem value="created">price</SelectItem>
          <SelectItem value="published">location</SelectItem>
          <SelectItem value="created">instrument</SelectItem>{" "}
          <SelectItem value="published">time</SelectItem>
          <SelectItem value="created">date</SelectItem>{" "}
        </SelectContent>
      </Select>
      <Divider />
    </div>
  );
};

export default Created;
