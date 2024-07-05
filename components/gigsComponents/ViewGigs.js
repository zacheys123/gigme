import React from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ViewGigs = () => {
  return (
    <div className="overflow-auto element-with-scroll">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Gig Display Options" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Published Gigs</SelectItem>
          <SelectItem value="dark">Created Gigs</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ViewGigs;
