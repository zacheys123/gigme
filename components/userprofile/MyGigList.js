import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import DisplayPostedGigs from "./DisplayPostedGigs";
const MyGigList = ({ user }) => {
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
  }, []);
  console.log(allgigs);
  return (
    <div className="w-full max-h-[200px] md:max-h-[250px] element-with-scroll   overflow-y-auto  shadow-lg shadow-slate-700 my-5 p-2">
      {allgigs?.gigs?.length > 0 ? (
        <DisplayPostedGigs
          gigs={allgigs}
          user={user}
          secondDiv="flex  gap-1 m-4"
          image="h-[17px] w-[17px] rounded-full"
          thirdDiv="flex items-center justify-between  bg-gray-400 rounded-md h-fit whitespace-nowrap  p-1 min-w-[190px]"
          title="text-[9px] font-bold"
          imageno={17}
        />
      ) : (
        <div className="text-gray-200 font-bold text-[11px]">
          Wait a moment!!!
        </div>
      )}
    </div>
  );
};
export default MyGigList;
MyGigList.propTypes = {
  user: PropTypes.object.isRequired,
};
