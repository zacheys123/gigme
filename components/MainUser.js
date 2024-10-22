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
const MainUser = ({ user, debHandlePermission, getUserId }) => {
  const { userId } = useAuth();
  const { user: curr } = useCurrentUser(userId);
  const router = useRouter();
  const [loadingPostId, setLoadingPostId] = useState(null);
  const [loadingFriend, setLoadingFriend] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      // onClick={() => router.push(`/friends/${user?.username}`)}
      className="  bg-neutral-800 ml-[40px] text-neutral-400 w-[300px] my-6 rounded-xl p-2 cursor-pointer hover:bg-gray-500/80 transition ease-in-out delay-150 hover:-translate-x-2 hover:scale-20  duration-300"
    >
      <div className="flex gap-4 items-center ">
        {" "}
        <AvatarComponent
          usercomm={user}
          posts="rounded-full w-[34px] h-[34px]"
        />
        <div className="w-full flex-col justify-center">
          <div className="flex items-center gap-2 text-[12px]">
            {user?.firstname} {user.lastname}
          </div>
          <div className="text-[11px]">{user?.email}</div>
        </div>
        <div className="flex flex-col ">
          <ButtonComponent
            disabled={!loadingPostId === user._id ? false : true}
            variant={
              user?.followers.includes(curr?.user?._id)
                ? "secondary"
                : "destructive"
            }
            classname=" h-[20px] text-[10px] my-1 font-bold max-w-[55px]"
            // onclick={() => {
            //   setLoadingPostId(user?._id);
            //   getUserId(user);
            //   setTimeout(() => {
            //     // After the operation, you can handle the logic for reading the post
            //     debHandlePermission();
            //     // Reset the loading state after reading
            //     setLoadingPostId(null);
            //   }, 2000);
            // }}
            title={
              loadingPostId === user._id ? (
                <span>Loading...</span>
              ) : (
                <>
                  {user?.followers.includes(curr?.user?._id) ? (
                    <span>following</span>
                  ) : (
                    <span>
                      follow <Add sx={{ fontSize: "16px" }} />
                    </span>
                  )}
                </>
              )
            }
          />
          <ButtonComponent
            variant="outline"
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
      </div>
    </motion.div>
  );
};
export default MainUser;
