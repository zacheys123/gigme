"use client";
import React, { useEffect } from "react";
import { PropTypes } from "prop-types";

import DisplayBookedGigs from "./DisplayBookedGigs";
const BookedGigList = ({ user }) => {
  const [allgigs, setAllgigs] = React.useState([]);
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
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full h-full element-with-scroll   bg-neutral-700 p-2">
      {allgigs?.gigs?.length > 0 ? (
        <DisplayBookedGigs gigs={allgigs} user={user} />
      ) : (
        <div className="text-gray-300">No Gigs posted yet</div>
      )}
    </div>
  );
};

export default BookedGigList;
BookedGigList.propTypes = {
  user: PropTypes.object.isRequired,
};
