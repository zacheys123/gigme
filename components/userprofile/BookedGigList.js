"use client";
import React, { useEffect } from "react";
import { PropTypes } from "prop-types";

import DisplayBookedGigs from "./DisplayBookedGigs";
const BookedGigList = ({ user }) => {
  const [allgigs, setAllgigs] = React.useState({});
  const getGigs = async () => {
    const res = await fetch("/api/gigs/allgigs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setAllgigs(data);
  };
  useEffect(() => {
    getGigs();
  }, []);

  return (
    <div className="w-full max-h-[200px] md:max-h-[250px] element-with-scroll overflow-y-auto  shadow-lg shadow-slate-700 my-5 p-2">
      {allgigs?.gigs?.length > 0 ? (
        <DisplayBookedGigs gigs={allgigs} user={user} />
      ) : (
        <div className="text-gray-200 font-bold text-[11px]">
          Wait a moment!!!
        </div>
      )}
    </div>
  );
};

export default BookedGigList;
BookedGigList.propTypes = {
  user: PropTypes.object.isRequired,
};
