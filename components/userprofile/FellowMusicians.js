import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { PropTypes } from "prop-types";

import { Button } from "../ui/button";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
const FellowMusicians = ({ user, allUsers }) => {
  const [loading, setLoading] = useState();

  const updateFollowers = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/follower/${data?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ follower: user?.user?._id }),
      });

      const followersData = await res.json();
      console.log(res);
      setLoading(false);
      if (res.ok) {
        console.log("followed!!!", followersData);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const updateFollowing = async (data) => {
    console.log(id);
    try {
      setLoading(true);
      const res = await fetch(`/api/user/following/${data?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ following: user?.user?._id }),
      });
      const followingData = await res.json();
      console.log(followingData);
      setLoading(false);
      if (res.ok) {
        console.log("following!!!", followingData);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    (prev) => prev;
  };
  return (
    <div
      className="element-with-scroll h-fit bg-neutral-700 w-full  flex flex-wrap  mt-3  p-4"
      onClick={() => {
        setShowFriendData(false);
        setShowPostedGigsData(false);
        setShowBookedGigsData(false);
        setShowAllGigsData(false);
      }}
    >
      {allUsers
        .filter((userd) => userd?.instrument?.length > 0)
        .map((otheruser) => {
          console.log(otheruser);
          return (
            <div
              key={otheruser._id}
              className=" w-[120px] bg-red-400 p-6 rounded-md my-2 mx-2 h-fit"
            >
              <div className="flex justify-center items-center w-full  mx-auto">
                <div className="">
                  {otheruser.picture && (
                    <Image
                      width={40}
                      height={40}
                      className="w-[40px] h-[40px] rounded-full text-center"
                      src={otheruser.picture}
                      alt={otheruser.username}
                    />
                  )}
                  <p className="text-white my-2 font-bold  text-[9px]">
                    {otheruser.username}
                  </p>
                  {!otheruser?.followers.includes(user?.user?._id) ? (
                    <Button variant="default" className="h-[20px] text-[9px]">
                      {loading ? (
                        <CircularProgress size="11px" sx={{ color: "white" }} />
                      ) : (
                        "Follow"
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      className="h-[20px] text-[9px] w-full"
                      onClick={() => {
                        updateFollowers(otheruser);
                        updateFollowing(otheruser);
                      }}
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
  );
};

export default FellowMusicians;
FellowMusicians.propTypes = {
  user: PropTypes.object,
  allUsers: PropTypes.array,
};
