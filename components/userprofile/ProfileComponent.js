import Image from "next/image";
import React from "react";
import { PropTypes } from "prop-types";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Add } from "@mui/icons-material";
import useStore from "@/app/zustand/useStore";
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
  initial,
  whileInView,
  whileTap,
  transition,
  onClick: handleClick,
  follows,
  userpost,
}) => {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      whileTap={whileTap}
      onClick={() => {
        if (
          !otheruser?.followers?.includes(user?.user?._id) &&
          userpost === false
        ) {
          updateFollowers(otheruser);
          updateFollowing(otheruser);
        } else {
          router.push(`/friends/${otheruser?.username}`);
        }
      }}
      key={otheruser?._id}
      className={maindiv}
    >
      {userpost && (
        <div className={thirdDiv} onClick={handleClick}>
          {otheruser?.picture && (
            <Image
              width={imageno}
              height={imageno}
              className={image}
              src={otheruser?.picture}
              alt={otheruser?.username}
            />
          )}
        </div>
      )}
      {!userpost ? (
        <div className="">
          <div className={thirdDiv} onClick={handleClick}>
            {otheruser?.picture && (
              <Image
                width={imageno}
                height={imageno}
                className={image}
                src={otheruser?.picture}
                alt={otheruser?.username}
              />
            )}

            <p className="text-yellow-400 my-2 font-bold  text-[11px] ">
              {otheruser.username}
            </p>
          </div>

          <div className="md:hidden flex items-center justify-center">
            {!follows && !otheruser?.followers?.includes(user?.user?._id) ? (
              <Button
                variant="default"
                className="h-[20px] text-[9px] w-full"
                onClick={() => {
                  updateFollowers(otheruser);
                  updateFollowing(otheruser);
                }}
              >
                Follow <Add size="12px" sx={{ fontSize: "16px" }} />
              </Button>
            ) : (
              <Button
                variant="default"
                className="h-[20px] text-[9px] w-full"
                onClick={() => router.push(`/friends/${otheruser?.username}`)}
              >
                View Profile
              </Button>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </motion.div>
  );
};

export default ProfileComponent;
ProfileComponent.propTypes = {
  user: PropTypes.object,
  otheruser: PropTypes.object,
  router: PropTypes.object,
  updateFollowers: PropTypes.func,
  updateFollowing: PropTypes.func,
  maindiv: PropTypes.string,
  thirdDiv: PropTypes.string,
  image: PropTypes.string,
  imageno: PropTypes.number,
  initial: PropTypes.object,
  whileInView: PropTypes.object,
  transition: PropTypes.object,
  onClick: PropTypes.func,
};
