"use client";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AvatarComponent from "./Avatar";
import ButtonComponent from "./ButtonComponent";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Hand } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";
import { debounce } from "@/utils/debounce";
import { requestNotificationPermission } from "@/lib/firebase";
import useSocket from "@/hooks/useSocket";
import useStore from "@/app/zustand/useStore";
import { useInView } from "react-intersection-observer";

const MainUser = ({ user, debHandlePermission, getUserId }) => {
  const { userId } = useAuth();
  const { user: curr } = useCurrentUser(userId);
  const router = useRouter();
  const [loadingPostId, setLoadingPostId] = useState(null);
  const [loadingFriend, setLoadingFriend] = useState(null);
  const { follow, setFollow } = useStore();
  const updateFollowers = async (data) => {
    setFollow(true);

    try {
      const res = await fetch(`/api/user/follower/${data?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ follower: curr?.user?._id }),
      });

      const followersData = await res.json();
      console.log(res);

      if (res.ok) {
        console.log("followed!!!", followersData);
        router.refresh();
      }
    } catch (error) {
      setFollow((prev) => !prev);
      console.log("error updating followers in search page", error);
    }
  };
  const updateFollowing = async (data) => {
    try {
      const res = await fetch(`/api/user/following/${data?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ following: curr?.user?._id }),
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

  const unFollower = async (data) => {
    setFollow(false);

    try {
      const res = await fetch(`/api/user/unfollower/${data?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ follower: curr?.user?._id }),
      });

      const followersData = await res.json();
      console.log(res);

      if (res.ok) {
        console.log("unfollowed!!!", followersData);
        router.refresh();
      }
    } catch (error) {
      setFollow((prev) => !prev);
      console.log("error updating followers in search page", error);
    }
  };
  const unFollowing = async (data) => {
    setFollow((prev) => !prev);
    try {
      setFollow(false);
      const res = await fetch(`/api/user/unfollowing/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ following: curr?.user?._id }),
      });
      const followingData = await res.json();
      console.log(followingData);
    } catch (error) {
      console.log(error);
    }
  };
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 }); // Lazy load

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="  bg-neutral-800 ml-[40px] text-neutral-400 w-[300px] my-6 rounded-xl p-2 cursor-pointer hover:bg-gray-500/80 transition ease-in-out delay-150 hover:-translate-x-2 hover:scale-20  duration-300      animate-fade"
    >
      <div className="flex gap-4 items-center ">
        {" "}
        <div
          className=" flex-1 flex items-center gap-1"
          onClick={() => router.push(`/friends/${user?.username}`)}
        >
          <AvatarComponent
            usercomm={user}
            posts="rounded-full w-[34px] h-[34px]"
          />
          <div className="w-full flex-col justify-center">
            <div className="flex items-center gap-2 text-[12px] text-input">
              {user?.firstname} {user.lastname}
            </div>
            <div className="text-[11px]">{user?.email}</div>
          </div>
        </div>
        {user && (
          <div className="flex flex-col ">
            <ButtonComponent
              // Simplified user check
              variant={
                follow === true || user?.followers.includes(curr?.user?._id)
                  ? "secondary"
                  : "destructive"
              }
              classname="h-[20px] text-[10px] my-1 font-bold max-w-[55px]"
              title={
                <>
                  {!follow && !user?.followers.includes(curr?.user?._id) ? (
                    <span
                      onClick={() => {
                        updateFollowers(user);
                        updateFollowing(user);
                      }}
                    >
                      follow <Add sx={{ fontSize: "16px" }} />
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        unFollower(user);
                        unFollowing(user);
                      }}
                    >
                      following
                    </span>
                  )}
                </>
              }
            />

            <ButtonComponent
              disabled={user ? true : false}
              variant={
                user?.followers.includes(curr?.user?._id)
                  ? "destructive"
                  : "outline"
              }
              classname=" h-[20px] text-[10px] my-1 font-bold max-w-[55px]"
              onclick={() => {
                setLoadingFriend(user?._id);
                getUserId(user);
                setTimeout(() => {
                  // After the operation, you can handle the logic for reading the post
                  debHandlePermission();
                  // Reset the loading state after reading
                  setLoadingFriend(null);
                }, 2000);
              }}
              title={
                loadingFriend === user.username ? (
                  <span>Loading...</span>
                ) : (
                  <span className="text-[11px]">🤝gigup </span>
                )
              }
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default MainUser;
