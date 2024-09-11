import Image from "next/image";
import React from "react";
import { PropTypes } from "prop-types";
import { Button } from "../ui/button";
const ProfileComponent = ({
  otheruser,
  user,
  router,
  updateFollowers,
  updateFollowing,
  maindiv,
  thirdDiv,
  image,
  imageno,
}) => {
  return (
    <div
      onClick={() => {
        if (!otheruser?.followers.includes(user?.user?._id)) {
          updateFollowers(otheruser);
          updateFollowing(otheruser);
        }
        router.push(`/friends/${otheruser?.username}`);
      }}
      key={otheruser._id}
      className={maindiv}
    >
      <div className="">
        <div className={thirdDiv}>
          {otheruser.picture && (
            <Image
              width={imageno}
              height={imageno}
              className={image}
              src={otheruser.picture}
              alt={otheruser.username}
            />
          )}
          <p className="text-yellow-400 my-2 font-bold  text-[11px] ">
            {otheruser.username}
          </p>{" "}
        </div>
        {!otheruser?.followers.includes(user?.user?._id) ? (
          <Button
            variant="default"
            className="h-[20px] text-[9px] w-full"
            onClick={() => {
              updateFollowers(otheruser);
              updateFollowing(otheruser);
            }}
          >
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
