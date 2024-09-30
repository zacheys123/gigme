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
        user?.user?.followers || user?.user?.followings
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
                maindiv=" w-[90px] bg-slate-400 shadow-sm shadow-yellow-500 p-1 rounded-md my-2 mx-4 h-[85px] hover:scale-110 transition-transform duration-75"
                thirdDiv="w-full flex justify-center  items-center flex-col"
                image="w-[25px] h-[25px] rounded-full text-center"
                imageno={25}
                onClick={handleRoute}
              />
            );
          })
      ) : (
        <div className="text-gray-200 font-bold text-[11px]">
          Wait a moment!!!
        </div>
      )}
    </div>
  );
};

FriendList.propTypes = {
  user: PropTypes.object,
  allUsers: PropTypes.array,
};

export default FriendList;
