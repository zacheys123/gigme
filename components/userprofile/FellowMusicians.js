import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { PropTypes } from "prop-types";

import { Button } from "../ui/button";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import useStore from "@/app/zustand/useStore";
import { useRouter } from "next/navigation";
import ProfileComponent from "./ProfileComponent";
const FellowMusicians = ({ user, allUsers }) => {
  const router = useRouter();
  const {
    setShowFriendData,

    setShowPostedGigsData,

    setShowBookedGigsData,

    setShowAllGigsData,
  } = useStore();

  const [profileview, setProfileView] = useState();
  const updateFollowers = async (data) => {
    try {
      const res = await fetch(`/api/user/follower/${data?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ follower: user?.user?._id }),
      });

      const followersData = await res.json();
      console.log(res);

      if (res.ok) {
        console.log("followed!!!", followersData);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateFollowing = async (data) => {
    try {
      const res = await fetch(`/api/user/following/${data?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ following: user?.user?._id }),
      });
      const followingData = await res.json();
      console.log(followingData);
      if (res.ok) {
        console.log("following!!!", followingData);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
    (prev) => prev;
  };
  return (
    <div
      className="element-with-scroll h-fit  shadow-md shadow-red-300 max-w-[400px]  overflow-auto flex whitespace-nowrap    mt-3  p-4 transition-all duration-150"
      onClick={() => {
        setShowFriendData(false);
        setShowPostedGigsData(false);
        setShowBookedGigsData(false);
        setShowAllGigsData(false);
      }}
    >
      <div className="inline-flex ">
        {allUsers
          .filter((userd) => userd?.instrument?.length > 0)
          .map((otheruser) => {
            return (
              <ProfileComponent
                key={otheruser?._id}
                otheruser={otheruser}
                user={user}
                router={router}
                updateFollowers={updateFollowers}
                updateFollowing={updateFollowing}
                maindiv=" w-[90px] bg-slate-400 shadow-sm shadow-yellow-500 p-1 rounded-md my-2 mx-4 h-[85px] hover:scale-110 transition-transform duration-75"
                thirdDiv="w-full flex justify-center  items-center flex-col"
                image="w-[25px] h-[25px] rounded-full text-center"
                imageno={25}
              />
            );
          })}
      </div>
    </div>
  );
};

export default FellowMusicians;
FellowMusicians.propTypes = {
  user: PropTypes.object,
  allUsers: PropTypes.array,
};
