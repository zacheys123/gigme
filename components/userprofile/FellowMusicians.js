import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { PropTypes } from "prop-types";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import useStore from "@/app/zustand/useStore";
import { useRouter } from "next/navigation";
import ProfileComponent from "./ProfileComponent";
import { motion } from "framer-motion";
const FellowMusicians = ({ user, allUsers }) => {
  const { setFollow, follows } = useStore();
  const router = useRouter();
  const {
    setShowFriendData,

    setShowPostedGigsData,

    setShowBookedGigsData,

    setShowAllGigsData,
  } = useStore();

  const [myUsers, setUsers] = useState(allUsers || []);
  const updateFollowers = async (data) => {
    setFollow(true);

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
      setFollow((prev) => !prev);
      console.log("error updating followers in profile page", error);
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
  };
  useEffect(() => {
    setUsers(allUsers);
  }, [follows]);

  return (
    <div
      className="w-full overflow-x-scroll scroll-smooth h-fit p-1"
      onClick={() => {
        setShowFriendData(false);
        setShowPostedGigsData(false);
        setShowBookedGigsData(false);
        setShowAllGigsData(false);
      }}
    >
      <div className="inline-flex flex-shrink-0 scroll-smooth ">
        {myUsers
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
                initial={{ opacity: 0, x: ["15px"] }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                follows={follows}
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
