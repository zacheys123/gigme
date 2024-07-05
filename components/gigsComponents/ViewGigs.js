import React from "react";
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
  return (
    <div className="overflow-auto element-with-scroll">
      <Select className="mb-2">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Gig Display Options" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Published Gigs</SelectItem>
          <SelectItem value="dark">Created Gigs</SelectItem>
        </SelectContent>
      </Select>
      <Divider />
      <div className="bg-neutral-200 w-full h-[100%]"></div>
    </div>
  );
};

export default ViewGigs;
