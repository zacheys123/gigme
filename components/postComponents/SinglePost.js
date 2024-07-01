import { Globe } from "lucide-react";
import React from "react";

const SinglePost = ({ post }) => {
  return (
    <div className="container p-2 bg-neutral-300 w-[90%] mx-auto h-[300px]">
      <div className="flex items-center">
        <Globe className="text-[10px]" sx={{ fontSize: "10px" }} />
      </div>
    </div>
  );
};

export default SinglePost;
