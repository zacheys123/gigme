"use client";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AvatarComponent from "./Avatar";
const MainUser = ({ user }) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      onClick={() => router.push(`/friends/${user?.username}`)}
      className=" bg-gray-700 ml-[40px] text-neutral-400 w-[300px] my-10 rounded-xl p-2 cursor-pointer hover:bg-gray-500/80 transition ease-in-out delay-150 hover:-translate-x-2 hover:scale-20  duration-300"
    >
      <div className="flex gap-4 items-center ">
        {" "}
        <AvatarComponent
          usercomm={user}
          posts="rounded-full w-[37px] h-[37px]"
        />
        <div className="w-full flex-col justify-center">
          <div className="flex items-center gap-2">
            {user?.firstname} {user.lastname}
          </div>
          <div>{user?.email}</div>
        </div>
      </div>
    </motion.div>
  );
};
export default MainUser;
