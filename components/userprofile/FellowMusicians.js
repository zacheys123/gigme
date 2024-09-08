import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { PropTypes } from "prop-types";

import { Button } from "../ui/button";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import useStore from "@/app/zustand/useStore";
import { useRouter } from "next/navigation";
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
      className="element-with-scroll h-fit bg-neutral-700 shadow-sm shadow-red-300  overflow-auto flex whitespace-nowrap    mt-3  p-4 transition-all duration-150"
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
            console.log(otheruser);

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
                className=" w-[110px] bg-slate-400 shadow-sm shadow-yellow-500 p-6 rounded-md my-2 mx-4 h-fit hover:scale-104 transition-transform duration-75"
              >
                <div className="flex justify-center items-center w-full  mx-auto">
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
                      <Button
                        variant="default"
                        className="h-[20px] text-[9px]"
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
                        onClick={() =>
                          router.push(`/friends/${otheruser?.username}`)
                        }
                      >
                        View Profile
                      </Button>
                    )}{" "}
                  </div>
                </div>
              </div>
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
