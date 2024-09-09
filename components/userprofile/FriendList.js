import React from "react";
import { PropTypes } from "prop-types";
import { useRouter } from "next/navigation";
import ProfileComponent from "./ProfileComponent";
const FriendList = ({ user, allUsers }) => {
  const router = useRouter();
  const lastUser = allUsers[allUsers.length - 1];

  return (
    <div
      className={
        user?.user?.followers || user?.user?.followers
          ? "element-with-scroll h-fit w-full bg-neutral-700 shadow-sm shadow-red-300  overflow-auto flex whitespace-nowrap    mt-3  p-4 transition-all duration-150"
          : "h-[0px] bg-inherit"
      }
    >
      {user?.user?.followers.length !== 0 ? (
        allUsers
          ?.filter((userd) => user?.user?.followers.includes(userd?._id))
          .map((otheruser) => {
            return (
              <ProfileComponent
                key={otheruser?._id}
                otheruser={otheruser}
                user={user}
                router={router}
              />
            );
          })
      ) : (
        <h6 className="text-[12px] font-bold font-mono text-gray-200">
          No data to display at the moment
        </h6>
      )}
      {user?.user?.followers.length !== 0 ? (
        allUsers
          ?.filter((userd) => user?.user?.followings.includes(userd?._id))
          .map((otheruser) => {
            return (
              <ProfileComponent
                key={otheruser?._id}
                otheruser={otheruser}
                user={user}
                router={router}
              />
            );
          })
      ) : (
        <h6 className="text-[12px] font-bold font-mono text-gray-200">
          No data to display at the moment
        </h6>
      )}{" "}
    </div>
  );
};

FriendList.propTypes = {
  user: PropTypes.object,
  allUsers: PropTypes.array,
};

export default FriendList;
