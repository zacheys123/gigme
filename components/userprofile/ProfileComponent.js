import Image from "next/image";
import React from "react";
import { PropTypes } from "prop-types";
import { Button } from "../ui/button";
const ProfileComponent = ({ otheruser, user, router }) => {
  return (
    <div
      key={otheruser._id}
      className=" w-[110px] bg-slate-400 shadow-sm shadow-yellow-500 p-2 rounded-md my-2 mx-4 h-fit hover:scale-110 transition-transform duration-75"
    >
      <div className="">
        {otheruser.picture && (
          <Image
            width={40}
            height={40}
            className="w-[40px] h-[40px] rounded-full "
            src={otheruser.picture}
            alt={otheruser.username}
          />
        )}
        <p className="text-yellow-400 my-2 font-bold  text-[11px] ">
          {otheruser.username}
        </p>
        {!otheruser?.followers.includes(user?.user?._id) ? (
          <Button variant="default" className="h-[20px] text-[9px]">
            Follow
          </Button>
        ) : (
          <Button
            variant="default"
            className="h-[20px] text-[9px] w-full"
            onClick={() => router.push(`/friends/${otheruser?.username}`)}
          >
            View Profile
          </Button>
        )}{" "}
      </div>
    </div>
  );
};

export default ProfileComponent;
ProfileComponent.propTypes = {
  user: PropTypes.object,
  otheruser: PropTypes.object,
  router: PropTypes.object,
};
